import { Controller, Get, Put, Param, Body, Query, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { PackagesService } from "./packages.service";
import { UpdatePackageDto } from "./dto/update-package.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ApiResponse } from "../../common/dto/api-response.dto";

@ApiTags("Packages (Pricing & Allocations)")
@Controller("packages")
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  // 1. PUBLIC: Get packages (optionally filtered by project)
  @Get()
  @ApiOperation({ summary: "Public: Get ownership packages" })
  @ApiQuery({ name: "projectSlug", required: false })
  async findAll(@Query("projectSlug") projectSlug?: string) {
    const data = await this.packagesService.findAll(projectSlug);
    return ApiResponse.success(data, "Packages retrieved successfully");
  }

  // 2. PUBLIC: Get single package details
  @Get(":id")
  @ApiOperation({ summary: "Public: Get single package" })
  async findOne(@Param("id") id: string) {
    const data = await this.packagesService.findOne(id);
    return ApiResponse.success(data, "Package details");
  }

  // 3. ADMIN: Live update price, booking money, or accommodation days
  @Put(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Admin: Update package price, booking money, or accommodation days" })
  async update(@Param("id") id: string, @Body() updateDto: UpdatePackageDto) {
    const data = await this.packagesService.update(id, updateDto);
    return ApiResponse.success(data, "Package updated successfully");
  }
}
