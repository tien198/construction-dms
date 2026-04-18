/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { PgConnectionService } from 'src/shared/infrastructure/persistence/psql/pg-connection.service';
import { ISubmissionRepository } from '../../../../../application/port/outbound/database/document.repository.port';
import { Submission } from '../../../../../domain/submission.entity';
import { DocumentId } from 'src/shared/domain/value-objects/document-id.vo';
import { ConstructionId } from 'src/construction/document/domain/value-objects/construction.vo';
import { DecisionId } from 'src/construction/document/domain/value-objects/document.vo';
import { ConstructionInfoId } from 'src/construction/document/domain/value-objects/construction-info.vo';

@Injectable()
export class PgSubmissionRepository implements ISubmissionRepository {
  private static _instance: PgSubmissionRepository;
  private constructor(private readonly _poolService: PgConnectionService) {}

  static getInstance(poolService: PgConnectionService) {
    if (!PgSubmissionRepository._instance) {
      PgSubmissionRepository._instance = new PgSubmissionRepository(
        poolService,
      );
    }
    return PgSubmissionRepository._instance;
  }

  async saveSubmission(
    submission: Submission,
    client?: PoolClient,
  ): Promise<Submission> {
    const result = await (client || this._poolService.pool).query(
      `INSERT INTO submissions (id, construction_id, decision_id, construction_info_snapshot_id, is_change_construction_info) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        submission.id.value,
        submission.construction_id.value,
        submission.decision_id.value,
        submission.construction_info_snapshot_id?.value ?? null,
        submission.is_change_construction_info ?? false,
      ],
    );
    return this.toDomain(result.rows[0]);
  }
  updateSubmission(
    id: string,
    submission: Partial<Submission>,
    client?: PoolClient,
  ): Promise<Submission> {
    throw new Error('Method not implemented.');
  }
  deleteSubmission(id: string, client?: PoolClient): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findSubmissionById(id: string, client?: PoolClient): Promise<Submission> {
    throw new Error('Method not implemented.');
  }
  findAllSubmissions(client?: PoolClient): Promise<Submission[]> {
    throw new Error('Method not implemented.');
  }

  private toDomain(row: any): Submission {
    return new Submission(
      new DocumentId(row.id),
      new ConstructionId(row.construction_id),
      new DecisionId(row.decision_id),
      row.construction_info_snapshot_id
        ? new ConstructionInfoId(row.construction_info_snapshot_id)
        : null,
      row.is_change_construction_info,
      null,
    );
  }
}
