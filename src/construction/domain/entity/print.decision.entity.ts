import { Decision } from '../type/decision.type';
import { PrintDocumentImp } from './print-document.entity';

// TRANSITION - entity is created in Controller foreach request
export class PrintDecisionImp extends PrintDocumentImp {
  constructor(dec: Decision) {
    super(dec);

    this.name = dec.submission.constructionInfor!.name;
    this.cost = this.formatCurrency(dec.submission.constructionInfor!.cost);
    this.costString = dec.submission.constructionInfor!.costString;
    this.sourceOfFunds = dec.submission.constructionInfor!.sourceOfFunds;
    this.constructionImplementationTime =
      this.formatDate(
        dec.submission.constructionInfor!.constructionImplementationTime
          .startDate,
        'month',
      ) +
      ' - ' +
      this.formatDate(
        dec.submission.constructionInfor!.constructionImplementationTime
          .endDate,
        'month',
      );

    this.existingConditionOfTheStructure =
      dec.submission.constructionInfor!.existingConditionOfTheStructure;
    this.repairScope = dec.submission.constructionInfor!.repairScope;
    this.bidPackages = this.printPackageMapper(
      dec.submission.constructionInfor!.bidPackages,
    );
    this.packagesAmount = this.formatCurrency(
      dec.submission.constructionInfor!.packagesAmount,
    );
    this.period = dec.submission.constructionInfor!.period;
  }
}
