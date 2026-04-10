/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { PgConnectionService } from 'src/shared/infrastructure/database/psql/pg-connection.service';
import { IDecisionRepository } from '../../../../../application/port/outbound/database/document.repository.port';
import { Decision } from '../../../../../domain/decision.entity';
import { DecisionId } from 'src/construction/document/domain/value-objects/document.vo';
import { ConstructionId } from 'src/construction/document/domain/value-objects/construction.vo';
import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';
import { DecisionResDto } from 'src/construction/document/application/dto/response/get-decision.res-dto';

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
    const result = await (client || this._poolService.pool).query(
      `INSERT INTO decisions (id, construction_id, is_change_construction_infor, period) VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        decision.id.value,
        decision.construction_id.value,
        decision.is_change_construction_infor ?? false,
        decision.period,
      ],
    );
    return this.toDomain(result.rows[0]);
  }

  async findDecisionById(id: string, client?: PoolClient): Promise<Decision> {
    const result = await (client || this._poolService.pool).query(
      `SELECT * FROM decisions WHERE id = $1`,
      [id],
    );
    if (result.rows.length === 0) {
      throw new Error(`Not found decision with id: "${id}"`);
    }
    return this.toDomain(result.rows[0]);
  }

  async findDecisionByPeriod(
    constructionId: string,
    period: ConstructionPeriod,
    client?: PoolClient,
  ): Promise<DecisionResDto> {
    const result = await (client || this._poolService.pool).query(
      `SELECT * FROM decisions WHERE construction_id = $1 AND period = $2`,
      [constructionId, period],
    );
    if (result.rows.length === 0) {
      throw new Error(`Not found decision with period: "${period}"`);
    }
    return result.rows[0] as DecisionResDto;
  }

  private toDomain(row: Record<string, any>): Decision {
    return new Decision(
      new DecisionId(row.id),
      new ConstructionId(row.construction_id),
      row.period,
      row.is_change_construction_infor,
    );
  }
}
