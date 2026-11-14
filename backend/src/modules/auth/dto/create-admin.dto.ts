import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateAdminDto {
  @ApiProperty({ example: "supervisor@sunsetkuakata.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "Sales Supervisor" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "SecurePass@2026" })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ example: "ADMIN", enum: ["SUPER_ADMIN", "ADMIN", "MODERATOR"] })
  @IsOptional()
  role?: string;
}
