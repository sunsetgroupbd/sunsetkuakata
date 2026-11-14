import { IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordDto {
  @ApiProperty({ description: "Current admin password" })
  @IsNotEmpty()
  @MinLength(6)
  currentPassword: string;

  @ApiProperty({ description: "New password (minimum 6 characters)" })
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
