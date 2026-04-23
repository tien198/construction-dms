import { Decision } from '../../../../../domain/decision.entity';
import { DecisionRow } from '../model/decision.row';

export class DecisionMapper {
  static toPersistence(decision: Decision): DecisionRow {
    const entity = new DecisionRow();
    entity.id = decision.id.value!;
    entity.construction_id = decision.construction_id.value!;
    entity.period = decision.period;
    return entity;
  }
}
