import { Decision } from 'src/construction/domain/type/decision.type';
import { CreateSubmissionDto } from './create-submission.dto';
import { NestedAdministrativeDocumentDto } from './nested-administrative-document.dto';
import { ConstructionPeriod } from 'src/construction/domain/type/construction.type';

export class CreateDecisionDto
  implements
    Partial<
      Omit<
        Decision,
        | 'id'
        | 'date'
        | 'submissions'
        | 'pursuantToDec_TCT'
        | 'pursuantToDec_TTMN'
      >
    >
{
  no: string;
  level: string;
  date: string;
  pursuantToDec_TCT: NestedAdministrativeDocumentDto;
  pursuantToDec_TTMN?: NestedAdministrativeDocumentDto;
  period: ConstructionPeriod;
  submissions: CreateSubmissionDto[];
  isApproved?: boolean;
}
