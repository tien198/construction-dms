/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { PgConnectionService } from 'src/shared/infrastructure/database/psql/pg-connection.service';
import { IDocumentRepository } from '../../../../application/port/outbound/document.repository.port';
import { Submission } from '../../../../domain/entity/submission.entity';

@Injectable()
export class PgSubmissionRepository implements Pick<
  IDocumentRepository,
  | 'saveSubmission'
  | 'updateSubmission'
  | 'deleteSubmission'
  | 'findSubmissionById'
  | 'findAllSubmissions'
> {
  private static instance: PgSubmissionRepository;
  private constructor(private readonly poolService: PgConnectionService) {}

  static getInstance(poolService: PgConnectionService) {
    if (!PgSubmissionRepository.instance) {
      PgSubmissionRepository.instance = new PgSubmissionRepository(poolService);
    }
    return PgSubmissionRepository.instance;
  }

  saveSubmission(
    submission: Submission,
    client?: PoolClient,
  ): Promise<Submission> {
    throw new Error('Method not implemented.');
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
  findSubmissionById(
    id: string,
    client?: PoolClient,
  ): Promise<Submission | null> {
    throw new Error('Method not implemented.');
  }
  findAllSubmissions(client?: PoolClient): Promise<Submission[]> {
    throw new Error('Method not implemented.');
  }
}
