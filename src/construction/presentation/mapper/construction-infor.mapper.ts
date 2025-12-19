import { Injectable } from '@nestjs/common';
import { ConstructionInforDto } from '../../presentation/dto/create-construction-infor.dto';
import { ConstructionInforImp } from '../../domain/entities/construction-infor.entity';
import { BidPackageMapper } from './bidPackage.mapper';

@Injectable()
export class ConstructionInforMapper {
  constructor(private readonly bidPackageMapper: BidPackageMapper) {}

  toEntity(dto: ConstructionInforDto) {
    const entity = new ConstructionInforImp();
    entity.name = dto.name;
    entity.cost = dto.cost;
    entity.costString = dto.costString;
    entity.sourceOfFunds = dto.sourceOfFunds;
    entity.constructionImplementationTime = {
      startDate: new Date(dto.constructionImplementationTime.startDate),
      endDate: new Date(dto.constructionImplementationTime.endDate),
    };
    entity.bidPackages = dto.bidPackages.map((p) =>
      this.bidPackageMapper.toEntity(p),
    );

    return entity;
  }

  toDto(entity: ConstructionInforImp) {
    const dto = new ConstructionInforDto();
    dto.name = entity.name;
    dto.cost = entity.cost;
    dto.costString = entity.costString;
    dto.sourceOfFunds = entity.sourceOfFunds;
    dto.constructionImplementationTime = {
      startDate: entity.constructionImplementationTime.startDate.toISOString(),
      endDate: entity.constructionImplementationTime.endDate.toISOString(),
    };
    dto.bidPackages = entity.bidPackages.map((p) =>
      this.bidPackageMapper.toDto(p),
    );

    return dto;
  }
}
