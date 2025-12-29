import { AdministrativeDocument } from '../type/administrative-document.type';
import { ConstructionInfor } from '../type/construction-infor.type';
import { ConstructionPeriod } from '../type/construction.type';
import { PrintBidPackage } from '../type/print-bid-package.type';
import { PrintConstructionInfor } from '../type/print-cnstruction-infor.type';
import { PrintDocumentImp } from './print-document.entity';

type DateObject = {
  dd: string;
  mm: string;
  yyyy: string;
};

// TRANSITION - entity is created in Controller foreach request
export class ConstructionPrintImp
  extends PrintDocumentImp
  implements PrintConstructionInfor
{
  name: string;
  cost: number;
  costString: string;
  sourceOfFunds: string;
  constructionImplementationTime: string;
  existingConditionOfTheStructure: string;
  repairScope: string;

  bidPackages: PrintBidPackage[];
  packagesAmount: string;
  period: ConstructionPeriod;

  constructor(doc: AdministrativeDocument, conInfor: ConstructionInfor) {
    super(doc);

    this.constructionImplementationTime =
      this.formatDate(
        conInfor.constructionImplementationTime.startDate,
        'month',
      ) +
      ' - ' +
      this.formatDate(conInfor.constructionImplementationTime.endDate, 'month');

    this.packagesAmount = this.formatCurrency(conInfor.packagesAmount);
  }

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
