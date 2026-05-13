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

export class BidderAssembler {
  static fromCmd(cmd: CreateBidderCommand): Bidder {
    return new Bidder(
      null,
      new BidderName(cmd.name),
      new BidderAddress(cmd.address),
      new BidderRepresentativeName(cmd.representativeName),
      new BidderRepresentativePosition(cmd.representativePosition),
      new BidderBankAccountNumber(cmd.bankAccountNumber),
      new BidderTaxId(cmd.taxId),
      new BidderPhoneNumber(cmd.phoneNumber),
      new BidderEmail(cmd.email),
    );
  }
}
