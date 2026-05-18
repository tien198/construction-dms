import type { CreateBidderCommand } from './create-bidder.command';

export class UpdateBidderCommand implements Partial<CreateBidderCommand> {
  name?: string;
  address?: string;
  representative_name?: string;
  representative_position?: string;
  bank_account_number?: string;
  tax_id?: string;
  phone_number?: string;
  email?: string;
}
