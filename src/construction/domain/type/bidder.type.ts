export interface Bidder {
  name: string;
  // Đại diện pháp luật
  legalRepresentative: { name: string; position: string };
  address: string;
  phone: string;
  email: string;
  // Mã Số Thuế
  taxCode: string;
  // Tk ngân hàng
  bankAccount: {
    accountNumber: string;
    bankName: string;
    branch: string;
  };
}
