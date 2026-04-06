import {
  IsString,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConstructionInfoSnapshotCommand } from './construction-info-snapshot.command';
import { DirectlyDecisionCommand } from './directly-decision.command';

export class CreateSubmissionCommand {
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
  is_change_construction_infor: boolean | null;

  @ApiPropertyOptional({
    type: () => ConstructionInfoSnapshotCommand,
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ConstructionInfoSnapshotCommand)
  construction_infor_snapshot?: ConstructionInfoSnapshotCommand;

  @ApiProperty({ type: () => DirectlyDecisionCommand })
  @ValidateNested()
  @Type(() => DirectlyDecisionCommand)
  directlyDecision: DirectlyDecisionCommand;
}
