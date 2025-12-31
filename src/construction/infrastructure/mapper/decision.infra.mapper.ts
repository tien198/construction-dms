import { Injectable } from '@nestjs/common';
import { InfraDecisionImp } from '../entities/decision.infra.entity';
import { SubmissionInfraMapper } from './submission.mapper';
import { SubmissionImp } from 'src/construction/domain/entity/submission.entity';
import { Decision } from 'src/construction/domain/type/decision.type';
import { DecisionViewModel } from 'src/construction/domain/viewModel/decison.view-model';

@Injectable()
export class DecisionInfraMapper {
  constructor(private readonly submissionMapper: SubmissionInfraMapper) {}
  toDomain(infra: InfraDecisionImp): DecisionViewModel {
    const approvedSub =
      infra.submissions.find((sub) => sub.isApproved) ??
      infra.submissions[infra.submissions.length - 1];
    const domain = new DecisionViewModel({
      ...infra,
      submission: approvedSub ?? new SubmissionImp(),
      isChangeConstructionInfor: infra.isChangeConstructionInfor,
    });
    return domain;
  }
  toInfra(domain: Decision): InfraDecisionImp {
    const sub = this.submissionMapper.toInfra(
      domain.submission ?? new SubmissionImp(),
    );

    const decInfra = new InfraDecisionImp({
      ...domain,
      submissions: [sub],
      isChangeConstructionInfor: domain.isChangeConstructionInfor ?? false,
    });
    return decInfra;
  }
}
