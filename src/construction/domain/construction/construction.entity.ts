import { v7 } from 'uuid';
import { ConstructionId } from '../value-objects/construction.vo';
import { PursuantToDecTCT } from '../value-objects/document.vo';

export class Construction {
  constructor(
    public id: ConstructionId,
    public pursuant_to_dec_tct_id: PursuantToDecTCT,
  ) {
    if (!id.value) {
      this.id = new ConstructionId(v7());
    }
  }
}
