import { DecisionImp } from '../entity/decison.entity';
import { SubmissionViewModel } from './submission.view-model';

export class DecisionViewModel extends DecisionImp {
  submission: SubmissionViewModel;
  isChangeConstructionInfor: boolean;

  constructor(dec: DecisionViewModel) {
    super(dec);
    this.submission = dec.submission;
    this.isChangeConstructionInfor = dec.isChangeConstructionInfor ?? false;
  }
}
