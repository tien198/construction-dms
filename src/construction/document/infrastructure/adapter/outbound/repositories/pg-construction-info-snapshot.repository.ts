/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { IDocumentRepository } from '../../../../domain/port/outbound/document.repository.port';
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
  saveConstructionInfoSnapshot(
    constructionInfoSnapshot: ConstructionInfoSnapshot,
  ): Promise<ConstructionInfoSnapshot> {
    throw new Error('Method not implemented.');
  }
  updateConstructionInfoSnapshot(
    id: string,
    constructionInfoSnapshot: Partial<ConstructionInfoSnapshot>,
  ): Promise<ConstructionInfoSnapshot> {
    throw new Error('Method not implemented.');
  }
  deleteConstructionInfoSnapshot(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findConstructionInfoSnapshotById(
    id: string,
  ): Promise<ConstructionInfoSnapshot | null> {
    throw new Error('Method not implemented.');
  }
  findAllConstructionInfoSnapshots(): Promise<ConstructionInfoSnapshot[]> {
    throw new Error('Method not implemented.');
  }
}
