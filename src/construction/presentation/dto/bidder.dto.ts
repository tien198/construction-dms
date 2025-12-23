import { Bidder } from 'src/construction/domain/type/bidder.type';

export class BidderDto implements Bidder {
  name: string;
  legalRepresentative: { name: string; position: string };
  address: string;
  phone: string;
  email: string;
  taxCode: string;
  bankAccount: {
    accountNumber: string;
    bankName: string;
    branch: string;
  };
}
