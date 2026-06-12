import {
  IsString,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
  IsDate,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConstructionInfoSnapshotCommand } from './construction-info-snapshot.command';
import { DirectlyDecisionCommand } from './directly-decision.command';
import { ICreateSubmissionCommand } from '../type/create-submission/create-submission.command.type';
import { BidPackageSnapshotCommand } from './bid-package-snapshot.command';

export class CreateSubmissionCommand implements ICreateSubmissionCommand {
  @ApiPropertyOptional()
  @IsString()
  con_id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  no: string;

  @ApiProperty()
  @IsString()
  level: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiPropertyOptional({ nullable: true })
  @IsString()
  pursuant_to_dec_tct_id: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  pursuant_to_dec_ttmn_id: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsBoolean()
  is_changed_construction_info: boolean | null;

  @ApiPropertyOptional({
    type: () => ConstructionInfoSnapshotCommand,
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ConstructionInfoSnapshotCommand)
  construction_info_snapshot?: ConstructionInfoSnapshotCommand;

  @ApiPropertyOptional({
    type: () => [BidPackageSnapshotCommand],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BidPackageSnapshotCommand)
  bid_package_snapshots?: BidPackageSnapshotCommand[];

  @ApiProperty({ type: () => DirectlyDecisionCommand })
  @ValidateNested()
  @Type(() => DirectlyDecisionCommand)
  directly_decision: DirectlyDecisionCommand;
}
