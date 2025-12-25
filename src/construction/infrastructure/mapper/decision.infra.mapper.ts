import { Injectable } from '@nestjs/common';
import { InfraDecisionImp } from '../entities/decision.infra.entity';
import { DecisionImp } from 'src/construction/domain/entity/decison.entity';

@Injectable()
export class DecisionInfraMapper {
  toDomain(infra: InfraDecisionImp): DecisionImp {
    const approvedSubmission = infra.submissions.find((sub) => sub.isApproved);

    const domain = new DecisionImp({
      ...infra,
      approvedSubmission,
      constructionInfor: infra.constructionInfor,
    });
    return domain;
  }
}
