import { Decision } from '../type/decision.type';
import { PrintDocumentImp } from './print-document.entity';

// TRANSITION - entity is created in Controller foreach request
export class PrintDecisionImp extends PrintDocumentImp {
  constructor(dec: Decision) {
    super(dec);

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

    this.packagesAmount = this.formatCurrency(
      dec.submission.constructionInfor!.packagesAmount,
    );
  }
}
