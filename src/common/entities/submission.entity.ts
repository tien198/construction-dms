import { BidPackage } from '../type/bidPackage.type';
import { ConstructionPeriod } from '../type/construction.type';
import { ConstructionInfor } from '../type/constructionInfor.type';
import { Submission } from '../type/submission.type';

export class SubmissionImp implements Submission {
  no: string;
  level: string;
  date: Date;
  pursuantToDec_TCT: string;
  pursuantToDec_TTMN: string;
  period: ConstructionPeriod;
  constructionInfor: ConstructionInfor;
  bidPackages: BidPackage[];
}
