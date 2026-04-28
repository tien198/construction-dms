import { Construction } from 'src/construction/domain/construction/construction.entity';
import { ConstructionRow } from '../model/construction.row';

export class ConstructionMapper {
  static toPersistence(construction: Construction): ConstructionRow {
    const entity = new ConstructionRow();
    entity.id = construction.id.value!;
    entity.pursuant_to_dec_tct_id = construction.pursuant_to_dec_tct_id.dec_id;
    return entity;
  }
}
