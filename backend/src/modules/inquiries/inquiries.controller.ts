import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { InquiriesService } from "./inquiries.service";
import { CreateInquiryDto } from "./dto/create-inquiry.dto";
import { UpdateInquiryDto } from "./dto/update-inquiry.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ApiResponse } from "../../common/dto/api-response.dto";

@ApiTags("Inquiries (Leads CRM)")
@Controller("inquiries")
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  // 1. PUBLIC: Lead submission from website inquiry form
  @Post()
  @ApiOperation({ summary: "Public: Submit investor consultation inquiry" })
  async create(@Body() createDto: CreateInquiryDto) {
    const result = await this.inquiriesService.create(createDto);
    return ApiResponse.success(result, "Inquiry submitted successfully");
  }

  // 2. ADMIN: List all inquiries with filters
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Admin: Get all inquiries with optional project, status, and search filters" })
  @ApiQuery({ name: "projectSlug", required: false })
  @ApiQuery({ name: "status", required: false })
  @ApiQuery({ name: "search", required: false })
  async findAll(
    @Query("projectSlug") projectSlug?: string,
    @Query("status") status?: string,
    @Query("search") search?: string,
  ) {
    const data = await this.inquiriesService.findAll(projectSlug, status, search);
    return ApiResponse.success(data, "Inquiries retrieved successfully");
  }

  // 3. ADMIN: Get lead summary statistics for dashboard
  @Get("stats")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Admin: Get lead pipeline statistics (total, new, converted)" })
  async getStats() {
    const stats = await this.inquiriesService.getStats();
    return ApiResponse.success(stats, "Inquiry statistics");
  }

  // 4. ADMIN: Get single inquiry
  @Get(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Admin: Get single inquiry by ID" })
  async findOne(@Param("id") id: string) {
    const data = await this.inquiriesService.findOne(id);
    return ApiResponse.success(data, "Inquiry details");
  }

  // 5. ADMIN: Update inquiry status and sales notes
  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Admin: Update lead status (e.g. CONTACTED, CONVERTED) and sales notes" })
  async update(@Param("id") id: string, @Body() updateDto: UpdateInquiryDto) {
    const data = await this.inquiriesService.update(id, updateDto);
    return ApiResponse.success(data, "Inquiry updated successfully");
  }

  // 6. ADMIN: Delete inquiry
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Admin: Delete inquiry record" })
  async remove(@Param("id") id: string) {
    await this.inquiriesService.remove(id);
    return ApiResponse.success(null, "Inquiry removed successfully");
  }
}
