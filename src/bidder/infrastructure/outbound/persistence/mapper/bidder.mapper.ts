import { Bidder } from 'src/bidder/domain/bidder.entity';
import { BidderRow } from '../model/bidder.row';
import {
  BidderId,
  BidderAddress,
  BidderName,
  BidderRepresentativeName,
  BidderRepresentativePosition,
  BidderBankAccountNumber,
  BidderTaxId,
  BidderPhoneNumber,
  BidderEmail,
} from 'src/bidder/domain/value-objects/bidder.vo';

export class BidderMapper {
  static fromPersistence(persistence: BidderRow): Bidder {
    const entity = new Bidder(
      new BidderId(persistence.id),
      new BidderName(persistence.name),
      new BidderAddress(persistence.address),
      new BidderRepresentativeName(persistence.representative_name),
      new BidderRepresentativePosition(persistence.representative_position),
      new BidderBankAccountNumber(persistence.bank_account_number),
      new BidderTaxId(persistence.tax_id),
      new BidderPhoneNumber(persistence.phone_number),
      new BidderEmail(persistence.email),
    );
    return entity;
  }

  static toPersistence(entity: Bidder): BidderRow {
    return {
      id: entity.id.value,
      name: entity.name.value,
      address: entity.address.value,
      representative_name: entity.representativeName.value,
      representative_position: entity.representativePosition.value,
      bank_account_number: entity.bankAccountNumber.value,
      tax_id: entity.taxId.value,
      phone_number: entity.phoneNumber.value,
      email: entity.email.value,
    };
  }
}
