import {
  IsString,
  IsDateString,
  ValidateNested,
  IsNotEmpty,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BidPackageSnapshotDto } from './bid-package-snapshot.dto';

export class ConstructionInfoSnapshotPostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  source_of_funds: string;

  @ApiProperty()
  @IsDateString()
  // impl - implementation
  impl_start_date: string;

  @ApiProperty()
  @IsDateString()
  impl_end_date: string;

  @ApiProperty()
  @IsString()
  existing_condition_of_the_structure: string;

  @ApiProperty()
  @IsString()
  repair_scope: string;

  @ApiProperty()
  @IsNumber()
  // est - estimated
  est_cost: number;

  @ApiProperty()
  @IsString()
  est_cost_str: string;

  @ApiProperty({ type: () => [BidPackageSnapshotDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BidPackageSnapshotDto)
  bid_package_snapshots: BidPackageSnapshotDto[];
}
