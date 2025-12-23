import { BankAccount } from '../type/bankAccount.type';

export class BankAccountImp implements BankAccount {
  accountNumber: string;
  bankName: string;
  branch: string;

  constructor(accountNumber: string, bankName: string, branch: string) {
    this.accountNumber = accountNumber;
    this.bankName = bankName;
    this.branch = branch;
  }

  toString(): string {
    return `${this.accountNumber}, tại Ngân hàng: ${this.bankName} - CN ${this.branch}`;
  }
}
