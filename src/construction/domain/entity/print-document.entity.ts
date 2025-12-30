import {
  AdministrativeDocument,
  NestedAdministrativeDocument,
} from 'src/construction/domain/type/administrative-document.type';
import {
  DateObject,
  PrintDocument,
} from '../type/print-administrative-document.type';
import { PrintBidPackage } from '../type/print-bid-package.type';
import { ConstructionPeriod } from '../type/construction.type';

export class PrintDocumentImp implements PrintDocument {
  id: string;
  no: string;
  level: string;
  date: DateObject;
  pursuantToDec_TCT: NestedAdministrativeDocument;
  pursuantToDec_TTMN?: NestedAdministrativeDocument;

  name: string;
  cost: string;
  costString: string;
  sourceOfFunds: string;
  constructionImplementationTime: string;
  existingConditionOfTheStructure: string;
  repairScope: string;

  bidPackages: PrintBidPackage[];
  packagesAmount: string;
  period: ConstructionPeriod;

  constructor(doc: AdministrativeDocument) {
    this.id = doc.id;
    this.no = doc.no;
    this.level = doc.level;
    this.date = this.toDateObject(doc.date);
    this.pursuantToDec_TCT = doc.pursuantToDec_TCT;
    this.pursuantToDec_TTMN = doc.pursuantToDec_TTMN;
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

  toDateObject = (ISOString: string | Date): DateObject => {
    const date = new Date(ISOString);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = String(date.getFullYear());
    return { dd, mm, yyyy };
  };

  formatCurrency = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
}
