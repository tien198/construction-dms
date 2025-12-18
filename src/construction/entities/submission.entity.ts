import { NestedAdministrativeDocument } from 'src/construction/type/administrative-document. type';
import { ConstructionInfor } from 'src/construction/type/construction-infor.type';
import { ConstructionPeriod } from 'src/construction/type/construction.type';
import { Submission } from 'src/construction/type/submission.type';

export class SubmissionImp implements Partial<Submission> {
  no: string;
  level: string;
  date: Date;
  pursuantToDec_TCT: NestedAdministrativeDocument;
  pursuantToDec_TTMN?: NestedAdministrativeDocument;
  period: ConstructionPeriod;
  constructionInfor: ConstructionInfor;
}
