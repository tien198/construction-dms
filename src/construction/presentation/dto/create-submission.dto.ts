import { Submission } from 'src/construction/domain/type/submission.type';
import { ConstructionInforDto } from './create-construction-infor.dto';
import { NestedAdministrativeDocumentDto } from './nested-administrative-document.dto';
import { ConstructionPeriod } from 'src/construction/domain/type/construction.type';

export class CreateSubmissionDto
  implements
    Partial<
      Omit<
        Submission,
        | 'date'
        | 'pursuantToDec_TCT'
        | 'pursuantToDec_TTMN'
        | 'constructionInfor'
        | 'bidPackages'
      >
    >
{
  no: string;
  level: string;
  date: string;
  pursuantToDec_TCT: NestedAdministrativeDocumentDto;
  pursuantToDec_TTMN?: NestedAdministrativeDocumentDto;
  period: ConstructionPeriod;
  constructionInfor?: ConstructionInforDto;
  // decision directly for this submission
  directlyDecision?: NestedAdministrativeDocumentDto;
}
