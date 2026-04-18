import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsEnum,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BidPackageType } from 'src/construction/domain/enum/bid-package.enum';
import { IBidPackageSnapshotCommand } from '../type/create-submission/bid-package-snapshot.type';

export class BidPackageSnapshotCommand implements IBidPackageSnapshotCommand {
  @ApiProperty()
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ enum: BidPackageType })
  @IsEnum(BidPackageType)
  type: BidPackageType;

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
  @IsDate()
  @Type(() => Date)
  bidder_selection_time: Date;

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
