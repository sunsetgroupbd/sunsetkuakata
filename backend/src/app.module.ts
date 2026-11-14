import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";
import { InquiriesModule } from "./modules/inquiries/inquiries.module";
import { PackagesModule } from "./modules/packages/packages.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    InquiriesModule,
    PackagesModule,
  ],
})
export class AppModule {}
