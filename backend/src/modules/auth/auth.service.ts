import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
  OnModuleInit,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../../prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { CreateAdminDto } from "./dto/create-admin.dto";

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    try {
      const adminCount = await this.prisma.adminUser.count();
      if (adminCount === 0) {
        const passwordHash = await bcrypt.hash("Admin@12345", 10);
        await this.prisma.adminUser.create({
          data: {
            email: "admin@sunsetkuakata.com",
            passwordHash,
            name: "Sunset Executive Admin",
            role: "SUPER_ADMIN",
          },
        });
        console.log("⚡ [Auto-Init] Default super admin created: admin@sunsetkuakata.com");
      }
    } catch (err) {
      console.warn("⚠️ [Auto-Init] Could not verify/seed admin user:", err);
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.adminUser.findUnique({
      where: { email: loginDto.email.toLowerCase().trim() },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.adminUser.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const isCurrentMatch = await bcrypt.compare(dto.currentPassword, user.passwordHash);
    if (!isCurrentMatch) {
      throw new BadRequestException("Current password is incorrect");
    }

    const newHash = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.adminUser.update({
      where: { id: userId },
      data: { passwordHash: newHash },
    });

    return { message: "Password updated successfully" };
  }

  async createAdmin(dto: CreateAdminDto) {
    const normalizedEmail = dto.email.toLowerCase().trim();
    const existing = await this.prisma.adminUser.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      throw new ConflictException("An admin account with this email already exists");
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const newAdmin = await this.prisma.adminUser.create({
      data: {
        email: normalizedEmail,
        name: dto.name.trim(),
        passwordHash,
        role: dto.role || "ADMIN",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return newAdmin;
  }

  async getAdmins() {
    return this.prisma.adminUser.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }
}
