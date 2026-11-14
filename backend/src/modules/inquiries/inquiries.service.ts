import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateInquiryDto } from "./dto/create-inquiry.dto";
import { UpdateInquiryDto } from "./dto/update-inquiry.dto";

@Injectable()
export class InquiriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateInquiryDto) {
    // Honeypot check: If bot fills "website", return success silently without database insertion
    if (dto.website && dto.website.length > 0) {
      return { id: "honeypot-ignored" };
    }

    return this.prisma.inquiry.create({
      data: {
        fullName: dto.fullName.trim(),
        phone: dto.phone.trim(),
        email: dto.email ? dto.email.trim().toLowerCase() : null,
        projectSlug: dto.projectSlug,
        packageSlug: dto.packageSlug || null,
        message: dto.message ? dto.message.trim() : null,
      },
    });
  }

  async findAll(projectSlug?: string, status?: string, search?: string) {
    const where: any = {};

    if (projectSlug && projectSlug !== "all") {
      where.projectSlug = projectSlug;
    }

    if (status && status !== "all") {
      where.status = status;
    }

    if (search && search.trim().length > 0) {
      where.OR = [
        { fullName: { contains: search.trim() } },
        { phone: { contains: search.trim() } },
        { email: { contains: search.trim() } },
      ];
    }

    return this.prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const inquiry = await this.prisma.inquiry.findUnique({ where: { id } });
    if (!inquiry) {
      throw new NotFoundException(`Inquiry with ID "${id}" not found`);
    }
    return inquiry;
  }

  async update(id: string, dto: UpdateInquiryDto) {
    await this.findOne(id);
    return this.prisma.inquiry.update({
      where: { id },
      data: {
        ...(dto.status ? { status: dto.status } : {}),
        ...(dto.notes !== undefined ? { notes: dto.notes } : {}),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.inquiry.delete({ where: { id } });
  }

  async getStats() {
    const [total, newCount, contactedCount, convertedCount] = await Promise.all([
      this.prisma.inquiry.count(),
      this.prisma.inquiry.count({ where: { status: "NEW" } }),
      this.prisma.inquiry.count({ where: { status: "CONTACTED" } }),
      this.prisma.inquiry.count({ where: { status: "CONVERTED" } }),
    ]);

    return {
      total,
      new: newCount,
      contacted: contactedCount,
      converted: convertedCount,
    };
  }
}
