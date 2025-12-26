import { Injectable } from '@nestjs/common';
import { CreateDecisionDto } from '../dto/create-decision.dto';
import { NestedAdministrativeDocumentMapper } from './nested-administrative-document.dto.mapper';
import { SubmissionMapper } from './submission.dto.mapper';
import { CreateSubmissionDto } from '../dto/create-submission.dto';
import { DecisionImp } from 'src/construction/domain/entity/decison.entity';
import { Decision } from 'src/construction/domain/type/decision.type';

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
    entity.submission = this.submissionMapper.toEntity(dto.submission);
    entity.isApproved = dto.isApproved ?? false;
    return entity;
  }

  toDto(entity: Decision) {
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
    dto.submission = this.submissionMapper.toDto(entity.submission);
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
    dec.submission = subDto;
    dec.period = subDto.period;
    dec.isApproved = false;
    dec.isChangeConstructionInfor = !!subDto.constructionInfor;
    dec.constructionInfor = subDto.constructionInfor;

    return dec;
  }
}
