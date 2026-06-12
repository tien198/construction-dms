import type { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';
import type { SubmissionResDto } from './dto/submission.res-dto';
import { AdminDocResDto } from './dto/admin-doc.res-dto';

export class GetDecisionQuery {
  constructor(
    readonly constructionId: string,
    readonly period: string,
  ) {}
}

export class DecisionDetailResDto extends AdminDocResDto {
  construction_id: string;
  period: ConstructionPeriod;
  submissions: SubmissionResDto[];
}
