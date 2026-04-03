/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { IDocumentRepository } from '../../../../application/port/outbound/document.repository.port';
import { AdministrativeDocument } from '../../../../domain/entity/administrative-document.entity';
import { PoolClient } from 'pg';
import { PgConnectionService } from 'src/shared/infrastructure/database/psql/pg-connection.service';

@Injectable()
export class PgAdministrativeDocumentRepository implements Pick<
  IDocumentRepository,
  | 'saveAdministrativeDocument'
  | 'updateAdministrativeDocument'
  | 'deleteAdministrativeDocument'
  | 'findAdministrativeDocumentById'
  | 'findAllAdministrativeDocuments'
> {
  private static instance: PgAdministrativeDocumentRepository;
  private constructor(private readonly poolService: PgConnectionService) {}

  static getInstance(poolService: PgConnectionService) {
    if (!PgAdministrativeDocumentRepository.instance) {
      PgAdministrativeDocumentRepository.instance =
        new PgAdministrativeDocumentRepository(poolService);
    }
    return PgAdministrativeDocumentRepository.instance;
  }

  saveAdministrativeDocument(
    administrativeDocument: AdministrativeDocument,
    client?: PoolClient,
  ): Promise<AdministrativeDocument> {
    throw new Error('Method not implemented.');
  }
  updateAdministrativeDocument(
    id: string,
    administrativeDocument: Partial<AdministrativeDocument>,
    client?: PoolClient,
  ): Promise<AdministrativeDocument> {
    throw new Error('Method not implemented.');
  }
  deleteAdministrativeDocument(id: string, client?: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAdministrativeDocumentById(
    id: string,
    client?: PoolClient,
  ): Promise<AdministrativeDocument | null> {
    throw new Error('Method not implemented.');
  }
  findAllAdministrativeDocuments(
    client?: PoolClient,
  ): Promise<AdministrativeDocument[]> {
    throw new Error('Method not implemented.');
  }
}
