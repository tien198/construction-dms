import { Decision } from '../../../../../domain/decision.entity';
import { DecisionEntity } from '../model/decision.entity';

export class DecisionMapper {
  static toPersistence(decision: Decision): DecisionEntity {
    const entity = new DecisionEntity();
    entity.id = decision.id.value!;
    entity.construction_id = decision.construction_id.value!;
    entity.period = decision.period;
    return entity;
  }
}
