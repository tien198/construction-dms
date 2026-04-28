import { PoolClient } from 'pg';
import { BasePersistence } from './base.persistence';
import { AdministrativeDocumentRow } from '../model/administrative-document.row';

export class AdministrativeDocumentWritePersistence extends BasePersistence {
  async save(
    client: PoolClient,
    adDoc: AdministrativeDocumentRow,
  ): Promise<void> {
    const sql = this._getManipulateFromFile('save-administrative-document.sql');
    await client.query(sql, [
      adDoc.id,
      adDoc.no,
      adDoc.level,
      adDoc.date,
      adDoc.pursuant_to_dec_tct_id,
      adDoc.pursuant_to_dec_tct_id,
    ]);
  }
}
