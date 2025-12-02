import { Injectable } from '@nestjs/common';
import { UpdateConstructionDto } from '../dto/update-construction.dto';
import { ConstructionImp } from '../entities/construction.entity';

@Injectable()
export class ConstructionMapper {
  toEntity(dto: UpdateConstructionDto) {
    const entity = new ConstructionImp();
    entity.id = dto.id;
    entity.documentNo = dto.documentNo ?? '';
    entity.name = dto.name ?? '';
    entity.dateOfSigning = new Date(dto.dateOfSigning ?? '');
    entity.budget = dto.budget ?? 0;
    entity.stringBudget = dto.stringBudget ?? '';
    entity.constructionExecutionTime = {
      startDate: new Date(dto.constructionExecutionTime?.startDate ?? ''),
      endDate: new Date(dto.constructionExecutionTime?.endDate ?? ''),
    };
    entity.existingConditionOfTheStructure =
      dto.existingConditionOfTheStructure ?? '';
    entity.repairScope = dto.repairScope ?? '';
    entity.decision = {
      number: dto.decision?.number ?? '',
      date: new Date(dto.decision?.date ?? ''),
    };

    return entity;
  }

  toDto(entity: ConstructionImp) {
    const dto = new UpdateConstructionDto();
    dto.id = entity.id;
    dto.documentNo = entity.documentNo;
    dto.name = entity.name;
    dto.dateOfSigning = entity.dateOfSigning.toISOString();
    dto.budget = entity.budget;
    dto.stringBudget = entity.stringBudget;
    dto.constructionExecutionTime = {
      startDate: entity.constructionExecutionTime.startDate.toISOString(),
      endDate: entity.constructionExecutionTime.endDate.toISOString(),
    };
    dto.existingConditionOfTheStructure =
      entity.existingConditionOfTheStructure;
    dto.repairScope = entity.repairScope;
    dto.decision = {
      number: entity.decision.number,
      date: entity.decision.date.toISOString(),
    };

    return dto;
  }
}
