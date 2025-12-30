import { Submission } from '../type/submission.type';
import { PrintBidPackageImp } from './print-bid-package.entity';
import { PrintDocumentImp } from './print-document.entity';

export class PrintSubmission extends PrintDocumentImp {
  constructor(sub: Submission) {
    super(sub);

    this.name = sub.constructionInfor!.name;
    this.cost = this.formatCurrency(sub.constructionInfor!.cost);
    this.costString = sub.constructionInfor!.costString;
    this.sourceOfFunds = sub.constructionInfor!.sourceOfFunds;
    this.constructionImplementationTime =
      this.formatDate(
        sub.constructionInfor!.constructionImplementationTime.startDate,
        'month',
      ) +
      ' - ' +
      this.formatDate(
        sub.constructionInfor!.constructionImplementationTime.endDate,
        'month',
      );

    this.existingConditionOfTheStructure =
      sub.constructionInfor!.existingConditionOfTheStructure;
    this.repairScope = sub.constructionInfor!.repairScope;
    this.bidPackages = sub.constructionInfor!.bidPackages.map((bp) => {
      const b = new PrintBidPackageImp(bp);
      b.cost = this.formatCurrency(bp.cost);
      b.bidderSelectionTime = this.formatDate(bp.bidderSelectionTime, 'month');
      return b;
    });
    this.packagesAmount = this.formatCurrency(
      sub.constructionInfor!.packagesAmount,
    );
    this.period = sub.constructionInfor!.period;
  }
}
