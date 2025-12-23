import { Bidder } from 'src/bidder/domain/type/bidder.type';
import { BankAccount } from 'src/common/domain/type/bankAccount.type';
import { Person } from 'src/common/domain/type/person.type';

export class BidderImp implements Bidder {
  id: string;
  name: string;
  // Đại diện pháp luật
  legalRepresentative: Person;
  address: string;
  phone: string;
  email: string;
  // Mã Số Thuế
  taxCode: string;
  // Tk ngân hàng
  bankAccount: BankAccount;

  constructor(bidder: Partial<Bidder>) {
    if (bidder) {
      Object.assign(this, bidder);
      if (!bidder.id) {
        this.id = Date.now() + '-' + crypto.randomUUID();
      }
    } else {
      this.id = Date.now() + '-' + crypto.randomUUID();
    }
  }
}
