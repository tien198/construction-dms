import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Decision } from 'src/construction/document/domain/entity/decision.entity';
import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.type';

export class DirectlyDecisionCommand {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  no: string;

  @ApiProperty()
  @IsEnum(ConstructionPeriod)
  period: Decision['period'];
}
