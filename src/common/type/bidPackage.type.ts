import { Bidder } from './bidder.type';

export type BidPackage = {
  projectOwner: string; // Công ty Trực thăng Miền Nam
  bidPackageName: string;
  shortDescription: string; // Tóm tắt công việc chính của gói thầu
  price: number; // Giá gói thầu
  bidderSelectionTime: Date; // Thời gian bắt đầu tổ chức lựa chọn nhà thầu
  bidderSelectionMethod: string; // Hình thức lựa chọn nhà thầu: chỉ định thầu rút gọn
  successfulBidder: Bidder; // Nhà thầu trúng thầu
  // contractType: string; // Loại hợp đồng: Trọn gói
  upTo: string; // Thời gian thực hiện gói thầu: 10 ngày, nhấn mạnh giới hạn 10 ngày
  isCompleted: boolean; // Gói thầu đã hoàn thành hay chưa
};
