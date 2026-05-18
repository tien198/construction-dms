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
import { UpdateBidderCommand } from '../application/command/update-bidder.command';

export class Bidder {
  public readonly id: BidderId;

  constructor(
    id: BidderId | null,
    public name: BidderName,
    public address: BidderAddress,
    public representativeName: BidderRepresentativeName,
    public representativePosition: BidderRepresentativePosition,
    public bankAccountNumber: BidderBankAccountNumber,
    public taxId: BidderTaxId,
    public phoneNumber: BidderPhoneNumber,
    public email: BidderEmail,
  ) {
    if (!id) {
      this.id = new BidderId(v7());
    } else {
      this.id = id;
    }
  }

  /**
   * @returns list of property was updated
   */
  update(updatedData: UpdateBidderCommand): string[] {
    if (updatedData.name) {
      this.name.value = updatedData.name;
      this.dirtyTracking.push('name');
    }

    if (updatedData.address) {
      this.address.value = updatedData.address;
      this.dirtyTracking.push('address');
    }

    if (updatedData.representative_name) {
      this.representativeName.value = updatedData.representative_name;
      this.dirtyTracking.push('representative_name');
    }

    if (updatedData.representative_position) {
      this.representativePosition.value = updatedData.representative_position;
      this.dirtyTracking.push('representative_position');
    }

    if (updatedData.bank_account_number) {
      this.bankAccountNumber.value = updatedData.bank_account_number;
      this.dirtyTracking.push('bank_account_number');
    }

    if (updatedData.tax_id) {
      this.taxId.value = updatedData.tax_id;
      this.dirtyTracking.push('tax_id');
    }

    if (updatedData.phone_number) {
      this.phoneNumber.value = updatedData.phone_number;
      this.dirtyTracking.push('phone_number');
    }

    if (updatedData.email) {
      this.email.value = updatedData.email;
      this.dirtyTracking.push('email');
    }

    return this.dirtyTracking;
  }

  /**
   * list of property that was updated (only used when invoke update method)
   */
  dirtyTracking: string[] = [];
}
