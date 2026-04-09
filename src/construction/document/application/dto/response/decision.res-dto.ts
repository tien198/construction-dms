import type { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';
import type { Submission } from './_decision-types/submission.type';
import { AdminDocResDto } from './_decision-types/admin-doc.res-dto';

export class Decision extends AdminDocResDto {
  period: ConstructionPeriod;
  submission: Submission;
}
