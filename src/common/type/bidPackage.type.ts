export type BidPackage = {
  projectOwner: string; // Công ty Trực thăng Miền Nam
  bidPackageName: string;
  shortDescription: string; // Tóm tắt công việc chính của gói thầu
  price: number; // Giá gói thầu
  contractorSelectionTime: Date; // Thời gian bắt đầu tổ chức lựa chọn nhà thầu
  contractorSelectionMethod: string; // Hình thức lựa chọn nhà thầu: chỉ định thầu rút gọn
  // contractType: string; // Loại hợp đồng: Trọn gói
  upTo: string; // Thời gian thực hiện gói thầu: 10 ngày, nhấn mạnh giới hạn 10 ngày
};
