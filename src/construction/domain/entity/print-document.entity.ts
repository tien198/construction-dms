import {
  AdministrativeDocument,
  NestedAdministrativeDocument,
} from 'src/construction/domain/type/administrative-document.type';
import { PrintDocument } from '../type/print-administrative-document.type';

export class PrintDocumentImp implements PrintDocument {
  id: string;
  no: string;
  level: string;
  date: string;
  pursuantToDec_TCT: NestedAdministrativeDocument;
  pursuantToDec_TTMN?: NestedAdministrativeDocument;

  constructor(doc?: AdministrativeDocument) {
    if (doc) {
      Object.assign(this, doc);
      this.date = doc.date.toISOString();
    }
  }

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
}
