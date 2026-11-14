import { Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UpdatePackageDto } from "./dto/update-package.dto";
import { DEFAULT_PACKAGES } from "./packages.data";

@Injectable()
export class PackagesService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    try {
      const count = await this.prisma.package.count();
      if (count === 0) {
        console.log("⚡ [Auto-Init] No packages found in DB. Seeding 16 verified brochure packages...");
        for (const pkg of DEFAULT_PACKAGES) {
          await this.prisma.package.create({ data: pkg });
        }
        console.log("✅ [Auto-Init] Successfully seeded 16 brochure packages.");
      }
    } catch (err) {
      console.warn("⚠️ [Auto-Init] Could not verify/seed packages:", err);
    }
  }

  async findAll(projectSlug?: string) {
    const where: any = {};
    if (projectSlug && projectSlug !== "all") {
      where.projectSlug = projectSlug;
    }

    try {
      const packages = await this.prisma.package.findMany({
        where,
        orderBy: [{ projectSlug: "asc" }, { order: "asc" }],
      });

      if (packages && packages.length > 0) {
        return packages;
      }
    } catch (err) {
      console.warn("⚠️ [DB Fallback] Failed querying packages, using fallback constants:", err);
    }

    // Resilient fallback if DB table is empty or unreachable
    if (projectSlug && projectSlug !== "all") {
      return DEFAULT_PACKAGES.filter((p) => p.projectSlug === projectSlug);
    }
    return DEFAULT_PACKAGES;
  }

  async findOne(id: string) {
    const pkg = await this.prisma.package.findUnique({ where: { id } });
    if (!pkg) {
      const fallback = DEFAULT_PACKAGES.find((p) => p.id === id);
      if (fallback) return fallback;
      throw new NotFoundException(`Package with ID "${id}" not found`);
    }
    return pkg;
  }

  async update(id: string, dto: UpdatePackageDto) {
    await this.findOne(id);
    return this.prisma.package.update({
      where: { id },
      data: {
        ...(dto.price !== undefined ? { price: dto.price } : {}),
        ...(dto.bookingMoney !== undefined ? { bookingMoney: dto.bookingMoney } : {}),
        ...(dto.stayDays !== undefined ? { stayDays: dto.stayDays } : {}),
        ...(dto.stayDaysDfi !== undefined ? { stayDaysDfi: dto.stayDaysDfi } : {}),
      },
    });
  }
}
