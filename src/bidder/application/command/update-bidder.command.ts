import type { CreateBidderCommand } from './create-bidder.command';

export class UpdateBidderCommand implements Partial<CreateBidderCommand> {
  name?: string;
  address?: string;
  representativeName?: string;
  representativePosition?: string;
  bankAccountNumber?: string;
  taxId?: string;
  phoneNumber?: string;
  email?: string;
}
