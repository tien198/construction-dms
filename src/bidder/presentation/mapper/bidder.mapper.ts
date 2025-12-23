import { Injectable } from '@nestjs/common';
import { UpdateBidderDto } from '../dto/update-bidder.dto';
import { BidderImp } from 'src/bidder/infrastructure/entities/bidder.entity';
import { Bidder } from 'src/bidder/domain/type/bidder.type';
import { CreateBidderDto } from '../dto/create-bidder.dto';

@Injectable()
export class BidderMapper {
  toEntity(dto: UpdateBidderDto | CreateBidderDto): Bidder {
    const entity = new BidderImp({
      id: dto instanceof UpdateBidderDto ? dto.id : '',
      name: dto.name,
      legalRepresentative: dto.legalRepresentative,
      address: dto.address,
      phone: dto.phone,
      email: dto.email,
      taxCode: dto.taxCode,
      bankAccount: dto.bankAccount,
    });
    return entity;
  }

  toDto(entity: Bidder): UpdateBidderDto {
    const dto = new UpdateBidderDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.legalRepresentative = entity.legalRepresentative;
    dto.address = entity.address;
    dto.phone = entity.phone;
    dto.email = entity.email;
    dto.taxCode = entity.taxCode;
    dto.bankAccount = entity.bankAccount;

    return dto;
  }
}
