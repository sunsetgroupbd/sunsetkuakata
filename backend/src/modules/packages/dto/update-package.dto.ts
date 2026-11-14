import { IsInt, IsOptional, IsPositive, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePackageDto {
  @ApiProperty({ example: 350000, required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  price?: number;

  @ApiProperty({ example: 100000, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  bookingMoney?: number;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  stayDays?: number;

  @ApiProperty({ example: 3, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  stayDaysDfi?: number;
}
