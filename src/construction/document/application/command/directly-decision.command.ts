import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Decision } from 'src/construction/document/domain/entity/decision.entity';

export class DirectlyDecisionCommand {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  no: string;

  @ApiProperty()
  @IsEnum(Decision['period'])
  period: Decision['period'];
}
