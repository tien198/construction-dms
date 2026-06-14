import { v7 } from 'uuid';
import {
  BidderAddress,
  BidderBankAccountNumber,
  BidderBankBranch,
  BidderBankName,
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
    public bankName: BidderBankName,
    public bankBranch: BidderBankBranch,
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
      this.name = new BidderName(updatedData.name);
      this.dirtyTracking.push('name');
    }

    if (updatedData.address) {
      this.address = new BidderAddress(updatedData.address);
      this.dirtyTracking.push('address');
    }

    if (updatedData.representative_name) {
      this.representativeName = new BidderRepresentativeName(
        updatedData.representative_name,
      );
      this.dirtyTracking.push('representative_name');
    }

    if (updatedData.representative_position) {
      this.representativePosition = new BidderRepresentativePosition(
        updatedData.representative_position,
      );
      this.dirtyTracking.push('representative_position');
    }

    if (updatedData.bank_account_number) {
      this.bankAccountNumber = new BidderBankAccountNumber(
        updatedData.bank_account_number,
      );
      this.dirtyTracking.push('bank_account_number');
    }

    if (updatedData.bank_name) {
      this.bankName = new BidderBankName(updatedData.bank_name);
      this.dirtyTracking.push('bank_name');
    }

    if (updatedData.bank_branch) {
      this.bankBranch = new BidderBankBranch(updatedData.bank_branch);
      this.dirtyTracking.push('bank_branch');
    }

    if (updatedData.tax_id) {
      this.taxId = new BidderTaxId(updatedData.tax_id);
      this.dirtyTracking.push('tax_id');
    }

    if (updatedData.phone_number) {
      this.phoneNumber = new BidderPhoneNumber(updatedData.phone_number);
      this.dirtyTracking.push('phone_number');
    }

    if (updatedData.email) {
      this.email = new BidderEmail(updatedData.email);
      this.dirtyTracking.push('email');
    }

    return this.dirtyTracking;
  }

  /**
   * list of property that was updated (only used when invoke update method)
   */
  dirtyTracking: string[] = [];
}
