import { Module } from '@nestjs/common';
import { ConstructionInfraMapper } from '../infrastructure/mapper/construction.mapper';
import { DecisionInfraMapper } from '../infrastructure/mapper/decision.infra.mapper';
import { SubmissionInfraMapper } from '../infrastructure/mapper/submission.mapper';

@Module({
  providers: [
    ConstructionInfraMapper,
    DecisionInfraMapper,
    SubmissionInfraMapper,
  ],
  exports: [
    ConstructionInfraMapper,
    DecisionInfraMapper,
    SubmissionInfraMapper,
  ],
})
export class InfraMapperModule {}
