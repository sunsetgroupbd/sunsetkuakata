import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.$connect();

    // Auto-migrate: Ensure ipAddress column exists in SQLite Inquiry table
    try {
      await this.$executeRawUnsafe(`ALTER TABLE "Inquiry" ADD COLUMN "ipAddress" TEXT;`);
      this.logger.log("Verified / Added missing column ipAddress to Inquiry table.");
    } catch {
      // Column already exists or table doesn't need migration
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
