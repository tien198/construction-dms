import { ConstructionPeriod } from '../../../domain/enum/construction-period.type';

export class Decision {
  id: string;
  construction_id: string;
  period: ConstructionPeriod;

  constructor(id: string, construction_id: string, period: ConstructionPeriod) {
    this.id = id;
    this.construction_id = construction_id;
    this.period = period;
  }
}
