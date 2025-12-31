import { SubmissionImp } from '../entity/submission.entity';
import { ConstructionInfor } from '../type/construction-infor.type';

export class SubmissionViewModel extends SubmissionImp {
  constructionInfor: ConstructionInfor;
  isApproved: boolean;

  constructor(sub: SubmissionViewModel) {
    super(sub);
    this.constructionInfor = sub.constructionInfor;
    this.isApproved = sub.isApproved;
  }
}
