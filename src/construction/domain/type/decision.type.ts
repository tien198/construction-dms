import { ConstructionPeriod } from '../enum/construction-period.type';

export interface Decision {
  id: string;
  construction_id: string;
  period: ConstructionPeriod;
}
