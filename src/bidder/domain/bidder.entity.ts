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
    const whiteList = new Set([
      'name',
      'address',
      'representativeName',
      'representativePosition',
      'bankAccountNumber',
      'taxId',
      'phoneNumber',
      'email',
    ]);

    const keys = Object.keys(updatedData);

    // if (updatedData.name) {
    //   this.name.value = updatedData.name;
    // }

    for (const key of keys) {
      if (whiteList.has(key)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        this[key].value = updatedData[key];
        this.dirtyTracking.push(key);
      }
    }

    return this.dirtyTracking;
  }

  /**
   * list of property that was updated (only used when invoke update method)
   */
  dirtyTracking: string[] = [];
}
