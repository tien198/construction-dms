import { PoolClient } from 'pg';
import { BasePersistence } from './base.persistence';
import { ConstructionInfoSnapshotRow } from '../model/construction-info.row';

export class ConstructionInfoWritePersistence extends BasePersistence {
  async save(
    client: PoolClient,
    info: ConstructionInfoSnapshotRow,
  ): Promise<void> {
    const sql = this._getManipulateFromFile(
      'save-construction-info-snapshot.sql',
    );
    await client.query(sql, [
      info.id,
      info.construction_id,
      info.submission_id,

      info.name,
      info.source_of_funds,

      info.est_cost,
      info.est_cost_str,

      info.impl_start_date,
      info.impl_end_date,

      info.existing_condition_of_the_structure,
      info.repair_scope,
      info.created_at,
    ]);
  }
}
