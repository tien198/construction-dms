import { Injectable } from '@nestjs/common';
import { InfraSubmissionImp } from '../entities/submission.infra.entity';
import { SubmissionImp } from 'src/construction/domain/entity/submission.entity';

@Injectable()
export class SubmissionInfraMapper {
  toDomain(infra: InfraSubmissionImp): SubmissionImp {
    const domain = new SubmissionImp(infra);
    return domain;
  }
  toInfra(domain: SubmissionImp): InfraSubmissionImp {
    const infra = new InfraSubmissionImp(domain);
    return infra;
  }
}
