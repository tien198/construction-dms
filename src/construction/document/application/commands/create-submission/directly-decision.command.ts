import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';
import { IDirectlyDecisionCommand } from '../type/create-submission/directly-decision';

export class DirectlyDecisionCommand implements IDirectlyDecisionCommand {
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
  period: ConstructionPeriod;
}
