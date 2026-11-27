import { IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateInquiryDto {
  @ApiProperty({ example: "Md. Tariqul Islam" })
  @IsString()
  @IsNotEmpty({ message: "Full name is required" })
  fullName: string;

  @ApiProperty({ example: "017XXXXXXXX" })
  @IsString()
  @IsNotEmpty({ message: "Phone number is required" })
  @Matches(/^(?:\+8801|8801|01)[3-9]\d{8}$/, {
    message: "Invalid Bangladeshi phone number (e.g. 01XXXXXXXXX)",
  })
  phone: string;

  @ApiProperty({ example: "investor@example.com", required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: "sunset-group", required: false, default: "sunset-group" })
  @IsOptional()
  @IsString()
  projectSlug?: string;

  @ApiProperty({ example: "gold", required: false })
  @IsOptional()
  @IsString()
  packageSlug?: string;

  @ApiProperty({ example: "Interested in corporate investment", required: false })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiProperty({ example: "Sunset Group Website", required: false })
  @IsOptional()
  @IsString()
  source?: string;

  // Honeypot field (hidden from real users, bots fill this)
  @IsOptional()
  @IsString()
  website?: string;
}
