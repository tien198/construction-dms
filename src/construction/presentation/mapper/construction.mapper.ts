import { Injectable } from '@nestjs/common';
import { UpdateConstructionDto } from '../../presentation/dto/update-construction.dto';
import { ConstructionImp } from '../../domain/entities/construction.entity';
import { CreateConstructionDto } from '../../presentation/dto/create-construction.dto';
import { ConstructionInforMapper } from './construction-infor.mapper';
import { NestedAdministrativeDocumentMapper } from './nested-administrative-document.mapper';
import { DecisionMapper } from './decision.mapper';
import { CreateSubmissionDto } from '../dto/create-submission.dto';
import { SubmissionMapper } from './submission.mapper';
import { CreateDecisionDto } from '../dto/create-decision.dto';

@Injectable()
export class ConstructionMapper {
  constructor(
    private readonly constructionInforMapper: ConstructionInforMapper,
    private readonly nestedAdministrativeDocumentMapper: NestedAdministrativeDocumentMapper,
    private readonly submissionMapper: SubmissionMapper,
    private readonly decisionMapper: DecisionMapper,
  ) {}

  toEntity(dto: CreateConstructionDto) {
    const entity = new ConstructionImp();
    entity.pursuantToDec_TCT = this.nestedAdministrativeDocumentMapper.toEntity(
      dto.pursuantToDec_TCT,
    );
    entity.decisions = dto.decisions.map((dec) =>
      this.decisionMapper.toEntity(dec),
    );
    entity.constructionInfor = this.constructionInforMapper.toEntity(
      dto.constructionInfor,
    );

    return entity;
  }

  toDto(entity: ConstructionImp) {
    const dto = new UpdateConstructionDto();
    dto.id = entity.id;
    dto.pursuantToDec_TCT = this.nestedAdministrativeDocumentMapper.toDto(
      entity.pursuantToDec_TCT,
    );
    dto.decisions = entity.decisions.map((dec) =>
      this.decisionMapper.toDto(dec),
    );
    dto.constructionInfor = this.constructionInforMapper.toDto(
      entity.constructionInfor,
    );
    return dto;
  }

  fromSubmissionDto(dto: CreateSubmissionDto) {
    const construction = new CreateConstructionDto();
    const decision: CreateDecisionDto = {
      no: dto.directlyDecision.no,
      level: dto.directlyDecision.level,
      date: dto.directlyDecision.date ?? dto.date,
      pursuantToDec_TCT: dto.pursuantToDec_TCT,
      period: dto.period,
      submissions: [dto],
    };
    construction.pursuantToDec_TCT = dto.pursuantToDec_TCT;
    construction.decisions.push(decision);
    construction.constructionInfor = dto.constructionInfor;
    return construction;
  }
}
