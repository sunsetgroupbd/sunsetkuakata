import { IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateInquiryDto {
  @ApiProperty({ example: "Md. Tariqul Islam" })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: "017XXXXXXXX" })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?:\+8801|8801|01)[3-9]\d{8}$/, {
    message: "Invalid Bangladeshi phone number (e.g. 01XXXXXXXXX)",
  })
  phone: string;

  @ApiProperty({ example: "investor@example.com", required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: "sun-care" })
  @IsString()
  @IsNotEmpty()
  projectSlug: string;

  @ApiProperty({ example: "gold", required: false })
  @IsOptional()
  @IsString()
  packageSlug?: string;

  @ApiProperty({ example: "Interested in 5x Gold Units consultation", required: false })
  @IsOptional()
  @IsString()
  message?: string;

  // Honeypot field (hidden from real users, bots fill this)
  @IsOptional()
  @IsString()
  website?: string;
}
