import {
  AdministrativeDocument,
  NestedAdministrativeDocument,
} from 'src/construction/domain/type/administrative-document.type';
import { PrintDocument } from '../type/print-administrative-document.type';
import { PrintBidPackage } from '../type/print-bid-package.type';
import { ConstructionPeriod } from '../type/construction.type';
import { BidPackage } from '../type/bidPackage.type';

export abstract class PrintDocumentImp implements PrintDocument {
  id: string;
  no: string;
  level: string;
  date: string;
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
    this.date = this.toFormalDate(doc.date);
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

  printPackageMapper(bidPackages: BidPackage[]): PrintBidPackage[] {
    return bidPackages.map((pkg) => ({
      type: pkg.type,
      projectOwner: pkg.projectOwner,
      bidPackageName: pkg.bidPackageName,
      shortDescription: pkg.shortDescription,
      cost: this.formatCurrency(pkg.cost),
      costString: pkg.costString,
      bidderSelectionTime: this.formatDate(pkg.bidderSelectionTime, 'month'),
      bidderSelectionMethod: pkg.bidderSelectionMethod,
      successfulBidder: pkg.successfulBidder,
      upTo: pkg.upTo,
      isCompleted: pkg.isCompleted,
    }));
  }
}
