import { Decision } from '../../../../../domain/decision.entity';
import { ConstructionEntity } from '../model/construction.entity';

export class ConstructionMapper {
  static toPersistence(decision: Decision): ConstructionEntity {
    const entity = new ConstructionEntity();
    entity.id = decision.construction_id.value!;
    entity.pursuant_to_dec_tct_id =
      decision.document.pursuant_to_dec_tct_id.dec_id;
    return entity;
  }
}
