export type BidPackage = {
  arrayIndex?: number; // Số thứ tự gói thầu trong mảng, Thiết kế, Thẩm tra, Thi công
  projectOwner: string; // Công ty Trực thăng Miền Nam
  bidPackageName: string;
  shortDescription: string; // Tóm tắt công việc chính của gói thầu
  price: number; // Giá gói thầu
  contractorSelectionTime: Date; // Thời gian bắt đầu tổ chức lựa chọn nhà thầu
  contractorSelectionMethod: string; // Hình thức lựa chọn nhà thầu: chỉ định thầu rút gọn
  contractType: string; // Loại hợp đồng: Trọn gói
  implementDuration: string; // Thời gian thực hiện gói thầu: 10 ngày
};
