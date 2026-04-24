import { PoolClient } from 'pg';
import { SubmissionRow } from '../model/submission.row';
import { BasePersistence } from './base.persistence';

export class SubmissionWritePersistence extends BasePersistence {
  async save(client: PoolClient, sub: SubmissionRow): Promise<void> {
    const sql = this._getManipulateFromFile('save-submission.sql');
    await client.query(sql, [sub.id, sub.construction_id, sub.decision_id]);
  }
}
