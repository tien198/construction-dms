import { Injectable } from '@nestjs/common';
import { UpdateConstructionDto } from '../dto/update-construction.dto';
import { InfraConstructionImp } from '../../infrastructure/entities/construction.infra.entity';
import { CreateConstructionDto } from '../dto/create-construction.dto';
import { ConstructionInforMapper } from './construction-infor.dto.mapper';
import { NestedAdministrativeDocumentMapper } from './nested-administrative-document.dto.mapper';
import { DecisionMapper } from './decision.dto.mapper';
import { CreateSubmissionDto } from '../dto/create-submission.dto';
import { SubmissionMapper } from './submission.dto.mapper';
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
    const entity = new InfraConstructionImp();
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

  toDto(entity: InfraConstructionImp) {
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

  initFromSubmissionDto(dto: Required<CreateSubmissionDto>) {
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
