/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import {
  IAdministrativeDocumentRepository,
  IDocumentRepository,
} from '../../../../../application/port/outbound/database/document.repository.port';
import { AdministrativeDocument } from '../../../../../domain/administrative-document.entity';
import { PoolClient } from 'pg';
import { PgConnectionService } from 'src/shared/infrastructure/database/psql/pg-connection.service';

@Injectable()
export class PgAdministrativeDocumentRepository implements IAdministrativeDocumentRepository {
  private static _instance: PgAdministrativeDocumentRepository;
  private constructor(private readonly _poolService: PgConnectionService) {}

  static getInstance(poolService: PgConnectionService) {
    if (!PgAdministrativeDocumentRepository._instance) {
      PgAdministrativeDocumentRepository._instance =
        new PgAdministrativeDocumentRepository(poolService);
    }
    return PgAdministrativeDocumentRepository._instance;
  }

  async saveAdministrativeDocument(
    administrativeDocument: AdministrativeDocument,
    client?: PoolClient,
  ): Promise<AdministrativeDocument> {
    const result = await this._poolService.pool.query(
      `INSERT INTO administrative_documents (id, no, level, date, pursuant_to_dec_tct_id, pursuant_to_dec_ttmn_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        administrativeDocument.id.value,
        administrativeDocument.no.value,
        administrativeDocument.level,
        administrativeDocument.date,
        administrativeDocument.pursuant_to_dec_tct_id.dec_id,
        administrativeDocument.pursuant_to_dec_ttmn_id?.dec_id ?? null,
      ],
    );
    return result.rows[0] as AdministrativeDocument;
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
  ): Promise<AdministrativeDocument> {
    throw new Error('Method not implemented.');
  }
  findAllAdministrativeDocuments(
    client?: PoolClient,
  ): Promise<AdministrativeDocument[]> {
    throw new Error('Method not implemented.');
  }
}
