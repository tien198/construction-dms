import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Decision } from 'src/construction/document/domain/decision.entity';
import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';

export class DirectlyDecisionCommand {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  no: string;

  @ApiProperty()
  @IsEnum(ConstructionPeriod)
  period: Decision['period'];
}
