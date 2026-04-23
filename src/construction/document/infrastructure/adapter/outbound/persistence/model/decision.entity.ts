import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';

export class DecisionEntity {
  id: string;
  construction_id: string;
  period: ConstructionPeriod;
}
