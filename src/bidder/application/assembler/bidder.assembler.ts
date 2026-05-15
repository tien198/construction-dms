import { Bidder } from 'src/bidder/domain/bidder.entity';
import { CreateBidderCommand } from '../command/create-bidder.command';
import {
  BidderAddress,
  BidderBankAccountNumber,
  BidderEmail,
  BidderName,
  BidderPhoneNumber,
  BidderRepresentativeName,
  BidderRepresentativePosition,
  BidderTaxId,
} from '../../domain/value-objects/bidder.vo';
import { GetBidderQueryResult } from '../query/get-bidder.result';

export class BidderAssembler {
  static fromCmd(cmd: CreateBidderCommand): Bidder {
    return new Bidder(
      null,
      new BidderName(cmd.name),
      new BidderAddress(cmd.address),
      new BidderRepresentativeName(cmd.representative_name),
      new BidderRepresentativePosition(cmd.representative_position),
      new BidderBankAccountNumber(cmd.bank_account_number),
      new BidderTaxId(cmd.tax_id),
      new BidderPhoneNumber(cmd.phone_number),
      new BidderEmail(cmd.email),
    );
  }

  static toQueryResult(entity: Bidder): GetBidderQueryResult {
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
