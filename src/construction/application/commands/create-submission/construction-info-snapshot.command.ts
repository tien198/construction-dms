import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IConstructionInfoSnapshotCommand } from '../type/create-submission/construction-info-snapshot.type';

export class ConstructionInfoSnapshotCommand implements IConstructionInfoSnapshotCommand {
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
  @IsDate()
  @Type(() => Date)
  // impl - implementation
  impl_start_date: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  impl_end_date: Date;

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
}
