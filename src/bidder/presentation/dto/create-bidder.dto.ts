import { Bidder } from 'src/bidder/domain/type/bidder.type';
import { BankAccount } from 'src/common/domain/type/bankAccount.type';
import { Person } from 'src/common/domain/type/person.type';

export class CreateBidderDto implements Omit<Bidder, 'id'> {
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
}
