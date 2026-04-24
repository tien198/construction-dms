import { Inject, Injectable } from '@nestjs/common';

import { PgConnectionService } from 'src/shared/infrastructure/persistence/psql/pg-connection.service';
import { DocumentBaseRepo } from './document-base.repository';
import { IDocumentWriteRepository } from '../../../../application/port/outbound/database/document-write.repository.port';
import { Decision } from 'src/construction/document/domain/decision.entity';
import type { IUnitOfWork } from 'src/construction/document/application/port/outbound/database/i-unit-of-work.port';
import { PoolClient } from 'pg';
import { ConstructionMapper } from './mapper/construction.mapper';
import { DecisionMapper } from './mapper/decision.mapper';
import { AdministrativeDocumentMapper } from './mapper/administrative-document.mapper';
import { ConstructionWritePersistence } from './persistence-helper/construction-write.persistence';

@Injectable()
export class DocumentWriteRepository
  extends DocumentBaseRepo
  implements IDocumentWriteRepository
{
  // temporary, hard-dependency
  private readonly _constructionPersistence =
    new ConstructionWritePersistence();

  constructor(
    connectionService: PgConnectionService,
    @Inject('IUnitOfWork') uow: IUnitOfWork,
  ) {
    super(connectionService, uow);
  }

  async initConstruction(dec: Decision): Promise<Decision> {
    const client = (await this._uow.begin()) as PoolClient;
    try {
      // construction
      const construction = ConstructionMapper.toPersistence(dec);
      await this._constructionPersistence.save(client, construction);

      // decision
      const decision = DecisionMapper.toPersistence(dec);
      const saveDecisionSql = this._getManipulateFromFile('save-decision.sql');
      await client.query(saveDecisionSql, [
        decision.id,
        decision.construction_id,
        decision.period,
      ]);

      const decisionAdDoc = AdministrativeDocumentMapper.toPersistence(
        dec.document,
      );
      const saveDecisionAdDocSql = this._getManipulateFromFile(
        'save-administrative-document.sql',
      );
      await client.query(saveDecisionAdDocSql, [
        decisionAdDoc.id,
        decisionAdDoc.no,
        decisionAdDoc.level,
        decisionAdDoc.date,
        decisionAdDoc.pursuant_to_dec_tct_id,
        decisionAdDoc.pursuant_to_dec_tct_id,
      ]);
    } catch (error) {}
  }

  async saveNewDecision(decision: Decision): Promise<Decision> {
    await Promise.resolve();
    throw new Error('Method not implemented.');
  }

  async saveExistingDecision(decision: Decision): Promise<Decision> {
    await Promise.resolve();
    throw new Error('Method not implemented.');
  }
}
