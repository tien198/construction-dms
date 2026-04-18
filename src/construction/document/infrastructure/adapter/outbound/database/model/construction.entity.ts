import { Construction } from 'src/construction/document/domain/construction.entity';

export class ConstructionModel {
  public id: string;
  public pursuant_to_dec_tct_id: string;
  public current_snapshot_id: string | null = null;

  constructor(construction: Construction) {
    this.id = construction.id.value!;
    this.pursuant_to_dec_tct_id = construction.pursuant_to_dec_tct_id.dec_id;
    this.current_snapshot_id = construction.current_snapshot_id?.value ?? null;
  }
}
