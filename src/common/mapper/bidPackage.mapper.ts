import { Injectable } from '@nestjs/common';
import { CreateBidPackageDto } from '../dto/create-bidPackage.dto';
import { BidPackageImp } from '../entities/bidPackage.entity';

@Injectable()
export class BidPackageMapper {
  toEntity(dto: CreateBidPackageDto): BidPackageImp {
    const entity = new BidPackageImp();
    if (!dto) return entity;

    entity.arrayIndex = dto.arrayIndex;
    entity.projectOwner = dto.projectOwner;
    entity.bidPackageName = dto.bidPackageName;
    entity.shortDescription = dto.shortDescription;
    // Convert price from string to number if possible
    entity.price = Number(dto.price);
    // Convert contractorSelectionTime from string to Date if possible
    entity.contractorSelectionTime = new Date(dto.contractorSelectionTime);
    entity.contractorSelectionMethod = dto.contractorSelectionMethod;
    // entity.contractType = dto.contractType;
    entity.implementDuration = dto.implementDuration;

    return entity;
  }

  toDto(entity: BidPackageImp): CreateBidPackageDto {
    const dto: CreateBidPackageDto = {
      arrayIndex: entity.arrayIndex,
      projectOwner: entity.projectOwner,
      bidPackageName: entity.bidPackageName,
      shortDescription: entity.shortDescription,
      // Convert price from number to string if possible
      price: entity.price ? String(entity.price) : '',
      // Convert contractorSelectionTime from Date to string if possible
      contractorSelectionTime:
        entity.contractorSelectionTime instanceof Date &&
        !isNaN(entity.contractorSelectionTime.getTime())
          ? entity.contractorSelectionTime.toISOString()
          : '',
      contractorSelectionMethod: entity.contractorSelectionMethod,
      // contractType: entity.contractType,
      implementDuration: entity.implementDuration,
    };
    return dto;
  }
}
