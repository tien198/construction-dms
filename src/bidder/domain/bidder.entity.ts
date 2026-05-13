import { v7 } from 'uuid';
import {
  BidderAddress,
  BidderBankAccountNumber,
  BidderEmail,
  BidderId,
  BidderName,
  BidderPhoneNumber,
  BidderRepresentativeName,
  BidderRepresentativePosition,
  BidderTaxId,
} from './value-objects/bidder.vo';

export class Bidder {
  public readonly id: BidderId;

  constructor(
    id: BidderId | null,
    public readonly name: BidderName,
    public readonly address: BidderAddress,
    public readonly representativeName: BidderRepresentativeName,
    public readonly representativePosition: BidderRepresentativePosition,
    public readonly bankAccountNumber: BidderBankAccountNumber,
    public readonly taxId: BidderTaxId,
    public readonly phoneNumber: BidderPhoneNumber,
    public readonly email: BidderEmail,
  ) {
    if (!id) {
      this.id = new BidderId(v7());
    } else {
      this.id = id;
    }
  }
}
