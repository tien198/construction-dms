import { Injectable } from '@nestjs/common';
import { InfraSubmissionImp } from '../entities/submission.infra.entity';
import { Submission } from 'src/construction/domain/type/submission.type';
import { SubmissionViewModel } from 'src/construction/domain/viewModel/submission.view-model';

@Injectable()
export class SubmissionInfraMapper {
  toDomain(infra: InfraSubmissionImp): SubmissionViewModel {
    const domain = new SubmissionViewModel(infra);
    return domain;
  }
  toInfra(domain: Submission): InfraSubmissionImp {
    const infra = new InfraSubmissionImp(domain);
    return infra;
  }
}
