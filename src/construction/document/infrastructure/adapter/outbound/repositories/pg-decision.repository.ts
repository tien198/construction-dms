/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { PgConnectionService } from 'src/shared/infrastructure/database/psql/pg-connection.service';
import { IDecisionRepository } from '../../../../application/port/outbound/document.repository.port';
import { Decision } from '../../../../domain/entity/decision.entity';

@Injectable()
export class PgDecisionRepository implements IDecisionRepository {
  private static _instance: PgDecisionRepository;
  private constructor(private readonly _poolService: PgConnectionService) {}

  static getInstance(poolService: PgConnectionService) {
    if (!PgDecisionRepository._instance) {
      PgDecisionRepository._instance = new PgDecisionRepository(poolService);
    }
    return PgDecisionRepository._instance;
  }

  async saveDecision(
    decision: Decision,
    client?: PoolClient,
  ): Promise<Decision> {
    const result = await this._poolService.pool.query(
      `INSERT INTO decisions (id, construction_id, is_change_construction_infor, period) VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        decision.id.value,
        decision.construction_id.value,
        decision.is_change_construction_infor ?? false,
        decision.period,
      ],
    );
    return result.rows[0] as Decision;
  }
  updateDecision(
    id: string,
    decision: Partial<Decision>,
    client?: PoolClient,
  ): Promise<Decision> {
    throw new Error('Method not implemented.');
  }
  deleteDecision(id: string, client?: PoolClient): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findDecisionById(id: string, client?: PoolClient): Promise<Decision | null> {
    throw new Error('Method not implemented.');
  }
  findAllDecisions(client?: PoolClient): Promise<Decision[]> {
    throw new Error('Method not implemented.');
  }
}
