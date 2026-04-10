import type { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';
import type { SubmissionResDto } from './_decision-res-dto/submission.res-dto';
import { AdminDocResDto } from './_decision-res-dto/admin-doc.res-dto';

export class DecisionResDto extends AdminDocResDto {
  period: ConstructionPeriod;
  submission: SubmissionResDto;
}
