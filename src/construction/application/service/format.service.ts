import { Injectable } from '@nestjs/common';

@Injectable()
export class FormatService {
  formatDate = (
    ISOString: string | Date | null,
    formatTo?: 'month' | 'year',
  ) => {
    const decisionDate = new Date(ISOString ?? '');
    const dd = String(decisionDate.getDate()).padStart(2, '0');
    const mm = String(decisionDate.getMonth() + 1).padStart(2, '0');
    const yyyy = decisionDate.getFullYear();
    if (!formatTo) {
      return dd + '/' + mm + '/' + yyyy;
    } else if (formatTo === 'month') {
      return 'Tháng ' + mm + '/' + yyyy;
    } else {
      return 'Năm ' + String(yyyy);
    }
  };

  toFormalDate = (ISOString: string | Date): string => {
    const date = new Date(ISOString);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = String(date.getFullYear());
    return `ngày ${dd} tháng ${mm} năm ${yyyy}`;
  };

  formatCurrency = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
}
