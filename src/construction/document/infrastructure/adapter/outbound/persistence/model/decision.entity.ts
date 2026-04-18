import { Decision } from 'src/construction/document/domain/decision.entity';

export class DecisionModel {
  public id: string;
  public construction_id: string;
  public period: string;
  public is_change_construction_info: boolean = false;

  constructor(dec: Decision) {
    this.id = dec.id.value!;
    this.construction_id = dec.construction_id.value!;
    this.period = dec.period;
    this.is_change_construction_info = dec.is_change_construction_info;
  }
}
