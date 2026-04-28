import { PoolClient } from 'pg';
import { ConstructionRow } from '../model/construction.row';
import { BasePersistence } from './base.persistence';

export class ConstructionWritePersistence extends BasePersistence {
  async save(client: PoolClient, construction: ConstructionRow): Promise<void> {
    const sql = this._getManipulateFromFile('save-construction.sql');
    await client.query(sql, [
      construction.id,
      construction.pursuant_to_dec_tct_id,
    ]);
  }
}
