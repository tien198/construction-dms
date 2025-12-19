import { Injectable } from '@nestjs/common';
import { BidPackageDto } from '../../domain/dto/bidPackage.dto';
import { BidPackageImp } from '../../domain/entities/bidPackage.entity';

@Injectable()
export class BidPackageMapper {
  toEntity(dto: BidPackageDto): BidPackageImp {
    const entity = new BidPackageImp();
    entity.projectOwner = dto.projectOwner;
    entity.bidPackageName = dto.bidPackageName;
    entity.shortDescription = dto.shortDescription;
    entity.cost = dto.cost;
    entity.bidderSelectionTime = new Date(dto.bidderSelectionTime);
    entity.bidderSelectionMethod = dto.bidderSelectionMethod;
    entity.successfulBidder = dto.successfulBidder;
    entity.upTo = dto.upTo;
    entity.isCompleted = dto.isCompleted;

    return entity;
  }

  toDto(entity: BidPackageImp): BidPackageDto {
    const dto = new BidPackageDto();
    dto.projectOwner = entity.projectOwner;
    dto.bidPackageName = entity.bidPackageName;
    dto.shortDescription = entity.shortDescription;
    dto.cost = entity.cost;
    dto.bidderSelectionTime = entity.bidderSelectionTime.toISOString();
    dto.bidderSelectionMethod = entity.bidderSelectionMethod;
    dto.successfulBidder = entity.successfulBidder;
    dto.upTo = entity.upTo;
    dto.isCompleted = entity.isCompleted;

    return dto;
  }
}
