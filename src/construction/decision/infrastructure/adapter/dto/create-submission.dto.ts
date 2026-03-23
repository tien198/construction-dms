import {
  IsString,
  IsDateString,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConstructionInfoSnapshotPostDto } from './construction-info-snapshot-post.dto';
import { DirectlyDecisionDto } from './directly-decision.dto';

export class CreateSubmissionDto {
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
  @IsDateString()
  date: string;

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
    type: () => ConstructionInfoSnapshotPostDto,
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ConstructionInfoSnapshotPostDto)
  construction_infor_snapshot?: ConstructionInfoSnapshotPostDto;

  @ApiProperty({ type: () => DirectlyDecisionDto })
  @ValidateNested()
  @Type(() => DirectlyDecisionDto)
  directlyDecision: DirectlyDecisionDto;
}
