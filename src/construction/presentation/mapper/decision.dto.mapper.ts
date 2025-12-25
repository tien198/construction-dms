import { Injectable } from '@nestjs/common';
import { InfraDecisionImp } from '../../infrastructure/entities/decision.infra.entity';
import { CreateDecisionDto } from '../dto/create-decision.dto';
import { NestedAdministrativeDocumentMapper } from './nested-administrative-document.dto.mapper';
import { SubmissionMapper } from './submission.dto.mapper';
import { CreateSubmissionDto } from '../dto/create-submission.dto';

@Injectable()
export class DecisionMapper {
  constructor(
    private readonly nestedAdministrativeDocumentMapper: NestedAdministrativeDocumentMapper,
    private readonly submissionMapper: SubmissionMapper,
  ) {}
  toEntity(dto: CreateDecisionDto): InfraDecisionImp {
    const entity = new InfraDecisionImp();
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

  toDto(entity: InfraDecisionImp) {
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

  fromSubmissionDto(subDto: CreateSubmissionDto): CreateDecisionDto {
    const directlyDec = subDto.directlyDecision;

    const dec = new CreateDecisionDto();
    dec.no = directlyDec!.no;
    dec.level = directlyDec!.level;
    dec.date = directlyDec?.date ?? subDto.date;
    dec.pursuantToDec_TCT = subDto.pursuantToDec_TCT;
    dec.pursuantToDec_TTMN = subDto.pursuantToDec_TTMN;
    dec.submissions = [];
    dec.period = subDto.period;
    dec.isApproved = false;
    dec.isChangeConstructionInfor = !!subDto.constructionInfor;
    dec.constructionInfor = subDto.constructionInfor;

    return dec;
  }
}
