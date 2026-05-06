import type { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';
import type { SubmissionResDto } from './_decision-detail-res-dto/submission.res-dto';
import { AdminDocResDto } from './_decision-detail-res-dto/admin-doc.res-dto';

export class DecisionDetailResDto extends AdminDocResDto {
  period: ConstructionPeriod;
  submissions: SubmissionResDto[];
}
