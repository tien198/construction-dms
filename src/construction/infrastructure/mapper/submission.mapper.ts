import { Injectable } from '@nestjs/common';
import { InfraSubmissionImp } from '../entities/submission.infra.entity';
import { SubmissionImp } from 'src/construction/domain/entity/submission.entity';
import { Submission } from 'src/construction/domain/type/submission.type';

@Injectable()
export class SubmissionInfraMapper {
  toDomain(infra: InfraSubmissionImp): SubmissionImp {
    const domain = new SubmissionImp(infra);
    return domain;
  }
  toInfra(domain: Submission): InfraSubmissionImp {
    const infra = new InfraSubmissionImp(domain);
    return infra;
  }
}
