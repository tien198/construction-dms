import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Decision } from 'src/construction/decision/domain/entity/decision.entity';

export class DirectlyDecisionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  no: string;

  @ApiProperty()
  @IsEnum(Decision['period'])
  period: Decision['period'];
}
