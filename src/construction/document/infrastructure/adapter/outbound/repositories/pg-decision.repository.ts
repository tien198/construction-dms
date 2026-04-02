/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { PgPoolService } from 'src/shared/infrastructure/database/pg-pool.service';
import { IDocumentRepository } from '../../../../application/port/outbound/document.repository.port';
import { Decision } from '../../../../domain/entity/decision.entity';

@Injectable()
export class PgDecisionRepository implements Pick<
  IDocumentRepository,
  | 'saveDecision'
  | 'updateDecision'
  | 'deleteDecision'
  | 'findDecisionById'
  | 'findAllDecisions'
> {
  private static instance: PgDecisionRepository;
  private constructor(private readonly poolService: PgPoolService) {}

  static getInstance(poolService: PgPoolService) {
    if (!PgDecisionRepository.instance) {
      PgDecisionRepository.instance = new PgDecisionRepository(poolService);
    }
    return PgDecisionRepository.instance;
  }

  saveDecision(decision: Decision, client?: PoolClient): Promise<Decision> {
    throw new Error('Method not implemented.');
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
