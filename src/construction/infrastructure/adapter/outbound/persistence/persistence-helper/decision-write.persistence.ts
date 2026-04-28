import { PoolClient } from 'pg';
import { BasePersistence } from './base.persistence';
import { DecisionRow } from '../model/decision.row';

export class DecisionWritePersistence extends BasePersistence {
  async save(client: PoolClient, dec: DecisionRow): Promise<void> {
    const saveDecisionSql = this._getManipulateFromFile('save-decision.sql');
    await client.query(saveDecisionSql, [
      dec.id,
      dec.construction_id,
      dec.period,
    ]);
  }
}
