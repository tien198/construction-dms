import { Injectable } from '@nestjs/common';
import { DecisionImp } from '../../domain/entities/decision.entity';
import { CreateDecisionDto } from '../../presentation/dto/create-decision.dto';
import { NestedAdministrativeDocumentMapper } from './nested-administrative-document.mapper';
import { SubmissionMapper } from './submission.mapper';

@Injectable()
export class DecisionMapper {
  constructor(
    private readonly nestedAdministrativeDocumentMapper: NestedAdministrativeDocumentMapper,
    private readonly submissionMapper: SubmissionMapper,
  ) {}
  toEntity(dto: CreateDecisionDto): DecisionImp {
    const entity = new DecisionImp();
    entity.no = dto.no;
    entity.level = dto.level;
    entity.date = new Date(dto.date);
    entity.pursuantToDec_TCT = this.nestedAdministrativeDocumentMapper.toEntity(
      dto.pursuantToDec_TCT,
    );
    entity.pursuantToDec_TTMN = dto.pursuantToDec_TTMN
      ? this.nestedAdministrativeDocumentMapper.toEntity(dto.pursuantToDec_TTMN)
      : undefined;
    entity.period = dto.period;
    entity.submissions = dto.submissions.map((submission) =>
      this.submissionMapper.toEntity(submission),
    );
    entity.isApproved = dto.isApproved ?? false;
    return entity;
  }

  toDto(entity: DecisionImp) {
    const dto = new CreateDecisionDto();
    dto.no = entity.no;
    dto.level = entity.level;
    dto.date = entity.date.toISOString();
    dto.pursuantToDec_TCT = this.nestedAdministrativeDocumentMapper.toDto(
      entity.pursuantToDec_TCT,
    );
    dto.pursuantToDec_TTMN = entity.pursuantToDec_TTMN
      ? this.nestedAdministrativeDocumentMapper.toDto(entity.pursuantToDec_TTMN)
      : undefined;
    dto.period = entity.period;
    dto.submissions = entity.submissions.map((sub) =>
      this.submissionMapper.toDto(sub),
    );
    dto.isApproved = entity.isApproved;
    return dto;
  }
}
