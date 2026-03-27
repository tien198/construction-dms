import { Injectable } from '@nestjs/common';
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
  saveConstruction(construction: Construction): Promise<Construction> {
    throw new Error('Method not implemented.');
  }
  updateConstruction(
    id: string,
    construction: Partial<Construction>,
  ): Promise<Construction> {
    throw new Error('Method not implemented.');
  }
  deleteConstruction(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findConstructionById(id: string): Promise<Construction | null> {
    throw new Error('Method not implemented.');
  }
  findAllConstructions(): Promise<Construction[]> {
    throw new Error('Method not implemented.');
  }
}
