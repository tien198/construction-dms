/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { PgPoolService } from 'src/shared/infrastructure/database/pg-pool.service';
import { IDocumentRepository } from '../../../../application/port/outbound/document.repository.port';
import { Construction } from '../../../../domain/entity/construction.entity';

@Injectable()
export class PgConstructionRepository implements Pick<
  IDocumentRepository,
  | 'saveConstruction'
  | 'updateConstruction'
  | 'deleteConstruction'
  | 'findConstructionById'
  | 'findAllConstructions'
> {
  private static instance: PgConstructionRepository;
  private constructor(private readonly poolService: PgPoolService) {}

  static getInstance(poolService: PgPoolService) {
    if (!PgConstructionRepository.instance) {
      PgConstructionRepository.instance = new PgConstructionRepository(
        poolService,
      );
    }
    return PgConstructionRepository.instance;
  }

  saveConstruction(
    construction: Construction,
    client?: PoolClient,
  ): Promise<Construction> {
    throw new Error('Method not implemented.');
  }
  updateConstruction(
    id: string,
    construction: Partial<Construction>,
    client?: PoolClient,
  ): Promise<Construction> {
    throw new Error('Method not implemented.');
  }
  deleteConstruction(id: string, client?: PoolClient): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findConstructionById(
    id: string,
    client?: PoolClient,
  ): Promise<Construction | null> {
    throw new Error('Method not implemented.');
  }
  findAllConstructions(client?: PoolClient): Promise<Construction[]> {
    throw new Error('Method not implemented.');
  }
}
