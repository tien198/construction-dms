import { NestedAdministrativeDocument } from 'src/construction/domain/type/administrative-document. type';
import { ConstructionInfor } from 'src/construction/domain/type/construction-infor.type';
import { ConstructionPeriod } from 'src/construction/domain/type/construction.type';
import { Submission } from 'src/construction/domain/type/submission.type';

export class SubmissionImp implements Partial<Submission> {
  id: string;
  no: string;
  level: string;
  date: Date;
  pursuantToDec_TCT: NestedAdministrativeDocument;
  pursuantToDec_TTMN?: NestedAdministrativeDocument;
  period: ConstructionPeriod;
  constructionInfor?: ConstructionInfor;
}
