import { Injectable } from '@nestjs/common';
import { UpdateConstructionDto } from '../../domain/dto/update-construction.dto';
import { ConstructionImp } from '../../domain/entities/construction.entity';
import { CreateConstructionDto } from '../../domain/dto/create-construction.dto';
import { ConstructionInforMapper } from './construction-infor.mapper';
import { NestedAdministrativeDocumentMapper } from './nested-administrative-document.mapper';
import { DecisionMapper } from './decision.mapper';

@Injectable()
export class ConstructionMapper {
  constructor(
    private readonly constructionInforMapper: ConstructionInforMapper,
    private readonly nestedAdministrativeDocumentMapper: NestedAdministrativeDocumentMapper,
    private readonly decisionMapper: DecisionMapper,
  ) {}

  toEntity(dto: CreateConstructionDto) {
    const entity = new ConstructionImp();
    entity.id = dto.id;
    entity.pursuantToDec_TCT = {
      no: dto.pursuantToDec_TCT.no,
      date: new Date(dto.pursuantToDec_TCT.date),
    };
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
}
