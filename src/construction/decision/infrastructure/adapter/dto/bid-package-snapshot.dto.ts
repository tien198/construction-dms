import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.type';

export class BidPackageSnapshotDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty({ enum: ConstructionPeriod })
  @IsEnum(ConstructionPeriod)
  type: ConstructionPeriod;

  @ApiProperty()
  @IsString()
  project_owner: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  // short_description
  short_desc: string;

  @ApiProperty()
  @IsDateString()
  bidder_selection_time: string;

  @ApiProperty()
  @IsString()
  bidder_selection_method: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  successful_bidder_id?: string | null;

  @ApiProperty()
  @IsString()
  duration: string;

  @ApiProperty()
  @IsBoolean()
  is_completed: boolean;

  @ApiProperty()
  @IsNumber()
  est_cost: number;

  @ApiProperty()
  @IsString()
  est_cost_str: string;
}
