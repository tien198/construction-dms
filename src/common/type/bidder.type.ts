export interface Bidder {
  name: string;
  Daidien: { name: string; position: string };
  address: string;
  phone: string;
  email: string;
  MST: string;
  STK: {
    STKNumber: string;
    bankName: string;
    branch: string;
  };
}
