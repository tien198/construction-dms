import { Injectable } from '@nestjs/common';
import { UpdateConstructionDto } from '../dto/update-construction.dto';
import { ConstructionImp } from '../entities/construction.entity';
import { BidPackageMapper } from './bidPackage.mapper';

@Injectable()
export class ConstructionMapper {
  constructor(private readonly bidPackageMapper: BidPackageMapper) {}

  toEntity(dto: UpdateConstructionDto) {
    const entity = new ConstructionImp();
    entity.id = dto.id;
    entity.documentNo = dto.documentNo ?? '';
    entity.name = dto.name ?? '';
    entity.dateOfSigning = new Date(dto.dateOfSigning ?? '');
    entity.budget = dto.budget ?? 0;
    entity.stringBudget = dto.stringBudget ?? '';
    entity.sourceOfFunds = dto.sourceOfFunds ?? '';
    entity.constructionImplementationTime = {
      startDate: new Date(dto.constructionImplementationTime?.startDate ?? ''),
      endDate: new Date(dto.constructionImplementationTime?.endDate ?? ''),
    };
    entity.existingConditionOfTheStructure =
      dto.existingConditionOfTheStructure ?? '';
    entity.repairScope = dto.repairScope ?? '';
    entity.decision = {
      number: dto.decision?.number ?? '',
      date: new Date(dto.decision?.date ?? ''),
    };
    entity.packages = dto.packages
      ? dto.packages.map((pkg) => this.bidPackageMapper.toEntity(pkg))
      : [];
    entity.packagesAmount =
      dto.packages?.reduce((acc, curr) => acc + Number(curr.price), 0) ?? 0;

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
    dto.sourceOfFunds = entity.sourceOfFunds;
    dto.constructionImplementationTime = {
      startDate: entity.constructionImplementationTime.startDate.toISOString(),
      endDate: entity.constructionImplementationTime.endDate.toISOString(),
    };
    dto.existingConditionOfTheStructure =
      entity.existingConditionOfTheStructure;
    dto.repairScope = entity.repairScope;
    dto.decision = {
      number: entity.decision.number,
      date: entity.decision.date.toISOString(),
    };
    dto.packages = entity.packages
      ? entity.packages.map((pkg) => this.bidPackageMapper.toDto(pkg))
      : [];

    return dto;
  }
}
