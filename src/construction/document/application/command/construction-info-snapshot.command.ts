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
import { BidPackageSnapshotCommand } from './bid-package-snapshot.command';

export class ConstructionInfoSnapshotCommand {
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

  @ApiProperty({ type: () => [BidPackageSnapshotCommand] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BidPackageSnapshotCommand)
  bid_package_snapshots: BidPackageSnapshotCommand[];
}
