import { Decision } from '../../../../../domain/decision.entity';
import { ConstructionRow } from '../model/construction.row';

export class ConstructionMapper {
  static toPersistence(decision: Decision): ConstructionRow {
    const entity = new ConstructionRow();
    entity.id = decision.construction_id.value!;
    entity.pursuant_to_dec_tct_id =
      decision.document.pursuant_to_dec_tct_id.dec_id;
    return entity;
  }
}
