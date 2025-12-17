import { Injectable } from '@nestjs/common';
import { CreateConstructionInforDto } from '../dto/create-construction-infor.dto';
import { ConstructionInforImp } from '../entities/construction-infor.entity';

@Injectable()
export class ConstructionInforMapper {
  toEntity(dto: CreateConstructionInforDto) {
    const entity = new ConstructionInforImp();
    entity.name = dto.name;
    entity.budget = dto.budget;
    entity.stringBudget = dto.stringBudget;
    entity.sourceOfFunds = dto.sourceOfFunds;
    entity.constructionImplementationTime = {
      startDate: new Date(dto.constructionImplementationTime.startDate),
      endDate: new Date(dto.constructionImplementationTime.endDate),
    };
    entity.bidPackages = dto.bidPackages.map((p) => ({
      ...p,
      bidderSelectionTime: new Date(p.bidderSelectionTime),
    }));

    return entity;
  }
}
