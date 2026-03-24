import { Module } from '@nestjs/common';
import { DecisionController } from './infrastructure/adapter/inbound/decision.controller';
import { DecisionService } from './application/service/decision.service';
import { PrismaDecisionRepository } from './infrastructure/adapter/outbound/prisma-decision.repository';

@Module({
  controllers: [DecisionController],
  providers: [
    {
      provide: 'IDecisionUseCase',
      useClass: DecisionService,
    },
    {
      provide: 'IDecisionRepository',
      useClass: PrismaDecisionRepository,
    },
  ],
  exports: ['IDecisionUseCase'],
})
export class DecisionModule {}
