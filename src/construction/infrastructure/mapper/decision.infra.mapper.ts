import { Injectable } from '@nestjs/common';
import { InfraDecisionImp } from '../entities/decision.infra.entity';
import { DecisionImp } from 'src/construction/domain/entity/decison.entity';
import { SubmissionInfraMapper } from './submission.mapper';
import { SubmissionImp } from 'src/construction/domain/entity/submission.entity';
import { Decision } from 'src/construction/domain/type/decision.type';

@Injectable()
export class DecisionInfraMapper {
  constructor(private readonly submissionMapper: SubmissionInfraMapper) {}
  toDomain(infra: InfraDecisionImp): DecisionImp {
    const domain = new DecisionImp({
      ...infra,
      submission:
        infra.submissions.find((sub) => sub.isApproved) ?? new SubmissionImp(),
    });
    return domain;
  }
  toInfra(domain: Decision): InfraDecisionImp {
    const sub = this.submissionMapper.toInfra(
      domain.submission ?? new SubmissionImp(),
    );
    return new InfraDecisionImp({
      ...domain,
      submissions: [sub],
    });
  }
}
