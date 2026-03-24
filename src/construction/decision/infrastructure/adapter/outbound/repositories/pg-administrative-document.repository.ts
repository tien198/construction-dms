/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { IDecisionRepository } from '../../../../domain/port/outbound/decision.repository.port';
import { AdministrativeDocument } from '../../../../domain/entity/administrative-document.entity';

@Injectable()
export class PgAdministrativeDocumentRepository implements Pick<
  IDecisionRepository,
  | 'saveAdministrativeDocument'
  | 'updateAdministrativeDocument'
  | 'deleteAdministrativeDocument'
  | 'findAdministrativeDocumentById'
  | 'findAllAdministrativeDocuments'
> {
  saveAdministrativeDocument(
    administrativeDocument: AdministrativeDocument,
  ): Promise<AdministrativeDocument> {
    throw new Error('Method not implemented.');
  }
  updateAdministrativeDocument(
    id: string,
    administrativeDocument: Partial<AdministrativeDocument>,
  ): Promise<AdministrativeDocument> {
    throw new Error('Method not implemented.');
  }
  deleteAdministrativeDocument(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAdministrativeDocumentById(
    id: string,
  ): Promise<AdministrativeDocument | null> {
    throw new Error('Method not implemented.');
  }
  findAllAdministrativeDocuments(): Promise<AdministrativeDocument[]> {
    throw new Error('Method not implemented.');
  }
}
