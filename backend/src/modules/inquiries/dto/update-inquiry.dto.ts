import { IsIn, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateInquiryDto {
  @ApiProperty({
    example: "CONTACTED",
    enum: ["NEW", "CONTACTED", "FOLLOW_UP", "CONVERTED", "CLOSED"],
    required: false,
  })
  @IsOptional()
  @IsIn(["NEW", "CONTACTED", "FOLLOW_UP", "CONVERTED", "CLOSED"])
  status?: string;

  @ApiProperty({ example: "Called client; requested Zoom presentation next Monday.", required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
