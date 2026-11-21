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
        console.log("⚡ [Auto-Init] No packages found in DB. Seeding all brochure packages...");
        for (const pkg of DEFAULT_PACKAGES) {
          await this.prisma.package.create({ data: pkg });
        }
        console.log(`✅ [Auto-Init] Successfully seeded ${DEFAULT_PACKAGES.length} brochure packages.`);
      } else {
        // Ensure any new packages added to DEFAULT_PACKAGES (e.g. The Deck) are seeded
        for (const pkg of DEFAULT_PACKAGES) {
          const exists = await this.prisma.package.findUnique({ where: { id: pkg.id } });
          if (!exists) {
            await this.prisma.package.create({ data: pkg });
            console.log(`✅ [Auto-Init] Seeded newly introduced package: ${pkg.id}`);
          }
        }
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
        orderBy: [{ order: "asc" }, { unitMultiplier: "asc" }],
      });

      if (packages && packages.length > 0) {
        // Fallback-merge any missing default packages (e.g. if DB not yet re-seeded on server)
        const dbIds = new Set(packages.map((p) => p.id));
        const missing = DEFAULT_PACKAGES.filter(
          (p) => (!projectSlug || projectSlug === "all" || p.projectSlug === projectSlug) && !dbIds.has(p.id)
        );
        if (missing.length > 0) {
          return [...packages, ...missing];
        }
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
    let pkg = await this.prisma.package.findUnique({ where: { id } });
    if (!pkg) {
      const fallback = DEFAULT_PACKAGES.find((p) => p.id === id);
      if (fallback) {
        pkg = await this.prisma.package.create({ data: fallback });
      } else {
        throw new NotFoundException(`Package with ID "${id}" not found`);
      }
    }
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
