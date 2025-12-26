import { AdministrativeDocument } from '../type/administrative-document.type';
import { BidPackage } from '../type/bidPackage.type';
import { ConstructionInfor } from '../type/construction-infor.type';
import { ConstructionPeriod } from '../type/construction.type';
import { AdministrativeDocumentImp } from './administrative-document.entity';

type DateObject = {
  dd: string;
  mm: string;
  yyyy: string;
};

// TRANSITION - entity is created in Controller foreach request
export class ConstructionDocument
  extends AdministrativeDocumentImp
  implements Omit<ConstructionInfor, 'constructionImplementationTime'>
{
  name: string;
  cost: number;
  costString: string;
  sourceOfFunds: string;
  constructionImplementationTime: string;
  existingConditionOfTheStructure: string;
  repairScope: string;

  bidPackages: BidPackage[];
  packagesAmount: number;
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

    this.decision = {
      number: conInfor.decision?.number,
      date: this.formatDate(conInfor.decision.date),
    };

    this.packages = conInfor.packages.map((pkg, i) => ({
      ...pkg,
      price: this.formatCurrency(pkg.price),
      contractorSelectionTime: this.formatDate(
        pkg.contractorSelectionTime,
        'month',
      ),
      isLast: i === con.packages.length - 1,
    }));
    this.packagesAmount = this.formatCurrency(con.packagesAmount);
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
