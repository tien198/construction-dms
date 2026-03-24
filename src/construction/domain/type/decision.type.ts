import { ConstructionPeriod } from '../enum/construction-period.type';

export interface Decision {
  id: string;
  construction_id: string;
  is_change_construction_infor?: boolean;
  period: ConstructionPeriod;
}
