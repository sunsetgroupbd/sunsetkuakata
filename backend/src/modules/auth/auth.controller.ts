import { Controller, Post, Get, Delete, Param, Body, UseGuards, Request } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { ApiResponse } from "../../common/dto/api-response.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "Admin login with email and password" })
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return ApiResponse.success(result, "Logged in successfully");
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get currently logged-in admin profile" })
  async me(@Request() req: any) {
    return ApiResponse.success(req.user, "Current admin profile");
  }

  @Post("change-password")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Change password for the logged-in admin" })
  async changePassword(@Request() req: any, @Body() dto: ChangePasswordDto) {
    const result = await this.authService.changePassword(req.user.id, dto);
    return ApiResponse.success(result, "Password changed successfully");
  }

  @Post("create-admin")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new admin user" })
  async createAdmin(@Body() dto: CreateAdminDto) {
    const result = await this.authService.createAdmin(dto);
    return ApiResponse.success(result, "New admin created successfully");
  }

  @Get("admins")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "List all admin accounts" })
  async getAdmins() {
    const result = await this.authService.getAdmins();
    return ApiResponse.success(result, "Admin accounts retrieved successfully");
  }

  @Delete("admins/:id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete an admin account" })
  async deleteAdmin(@Request() req: any, @Param("id") id: string) {
    const result = await this.authService.deleteAdmin(id, req.user.id);
    return ApiResponse.success(result, "Admin account deleted successfully");
  }
}
