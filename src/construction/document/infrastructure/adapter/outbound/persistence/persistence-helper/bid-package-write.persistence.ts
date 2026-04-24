import { PoolClient } from 'pg';
import { BasePersistence } from './base.persistence';
import { BidPackageSnapshotRow } from '../model/bid-package.row';

export class BidPackageWritePersistence extends BasePersistence {
  async save(client: PoolClient, bp: BidPackageSnapshotRow): Promise<void> {
    const sql = this._getManipulateFromFile('save-bid-package.sql');
    await client.query(sql, [
      bp.id,
      bp.construction_id,
      bp.submission_id,

      bp.type,
      bp.project_owner,
      bp.name,
      bp.short_desc,

      bp.est_cost,
      bp.est_cost_str,

      bp.bidder_selection_time,
      bp.bidder_selection_method,

      bp.successful_bidder_id,
      bp.duration,
      bp.is_completed,

      bp.created_at,
    ]);
  }
}
