import { ConstructionPeriod } from '../../../domain/enum/construction-period.type';

export class Decision {
  id: string;
  construction_id: string;
  is_change_construction_infor?: boolean;
  period: ConstructionPeriod;

  constructor(
    id: string,
    construction_id: string,
    period: ConstructionPeriod,
    is_change_construction_infor: boolean = false,
  ) {
    this.id = id;
    this.construction_id = construction_id;
    this.period = period;
    this.is_change_construction_infor = is_change_construction_infor;
  }
}
