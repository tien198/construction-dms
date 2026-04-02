/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { PgPoolService } from 'src/shared/infrastructure/database/pg-pool.service';
import { IDocumentRepository } from '../../../../application/port/outbound/document.repository.port';
import { ConstructionInfoSnapshot } from '../../../../domain/entity/construction-infor.entity';

@Injectable()
export class PgConstructionInfoSnapshotRepository implements Pick<
  IDocumentRepository,
  | 'saveConstructionInfoSnapshot'
  | 'updateConstructionInfoSnapshot'
  | 'deleteConstructionInfoSnapshot'
  | 'findConstructionInfoSnapshotById'
  | 'findAllConstructionInfoSnapshots'
> {
  private static instance: PgConstructionInfoSnapshotRepository;
  private constructor(private readonly poolService: PgPoolService) {}

  static getInstance(poolService: PgPoolService) {
    if (!PgConstructionInfoSnapshotRepository.instance) {
      PgConstructionInfoSnapshotRepository.instance =
        new PgConstructionInfoSnapshotRepository(poolService);
    }
    return PgConstructionInfoSnapshotRepository.instance;
  }

  saveConstructionInfoSnapshot(
    constructionInfoSnapshot: ConstructionInfoSnapshot,
    client?: PoolClient,
  ): Promise<ConstructionInfoSnapshot> {
    throw new Error('Method not implemented.');
  }
  updateConstructionInfoSnapshot(
    id: string,
    constructionInfoSnapshot: Partial<ConstructionInfoSnapshot>,
    client?: PoolClient,
  ): Promise<ConstructionInfoSnapshot> {
    throw new Error('Method not implemented.');
  }
  deleteConstructionInfoSnapshot(
    id: string,
    client?: PoolClient,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findConstructionInfoSnapshotById(
    id: string,
    client?: PoolClient,
  ): Promise<ConstructionInfoSnapshot | null> {
    throw new Error('Method not implemented.');
  }
  findAllConstructionInfoSnapshots(
    client?: PoolClient,
  ): Promise<ConstructionInfoSnapshot[]> {
    throw new Error('Method not implemented.');
  }
}
