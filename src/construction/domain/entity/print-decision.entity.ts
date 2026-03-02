import {
  PrintDecision,
  PrintNestedSubmission,
} from '../type/print-decision.type.';
import { ConstructionPeriod } from '../type/construction.type';
import { PrintDocumentImp } from './print-document.entity';
import { DecisionViewModel } from '../viewModel/decison.view-model';
import { SubmissionViewModel } from '../viewModel/submission.view-model';

export class PrintDecisionImp
  extends PrintDocumentImp
  implements PrintDecision
{
  period: ConstructionPeriod;
  isApproved: boolean;
  submission: PrintNestedSubmission;
  isChangeConstructionInfor?: boolean;

  constructor(dec: DecisionViewModel) {
    super(dec, dec.submission.constructionInfor);
    this.period = dec.period;
    this.isApproved = dec.isApproved;
    this.submission = this.toPrintNestedSubmission(dec.submission);
    this.isChangeConstructionInfor = dec.isChangeConstructionInfor;
  }

  toPrintNestedSubmission(sub: SubmissionViewModel): PrintNestedSubmission {
    return {
      date: this.formatDate(sub.date),
      id: sub.id,
      no: sub.no,
      level: sub.level,
      pursuantToDec_TCT: this.toPrintNestedAdministrativeDocument(
        sub.pursuantToDec_TCT,
      ),
      pursuantToDec_TTMN: sub.pursuantToDec_TTMN
        ? this.toPrintNestedAdministrativeDocument(sub.pursuantToDec_TTMN)
        : undefined,
    };
  }
}
