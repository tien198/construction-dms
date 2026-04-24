import { Inject, Injectable } from '@nestjs/common';

import type { IUnitOfWork } from 'src/construction/document/application/port/outbound/database/i-unit-of-work.port';
import type { PoolClient } from 'pg';

import { PgConnectionService } from 'src/shared/infrastructure/persistence/psql/pg-connection.service';
import { DocumentBaseRepo } from './document-base.repository';
import { IDocumentWriteRepository } from '../../../../application/port/outbound/database/document-write.repository.port';
import { Decision } from 'src/construction/document/domain/decision.entity';
import { ConstructionMapper } from './mapper/construction.mapper';
import { DecisionMapper } from './mapper/decision.mapper';
import { AdministrativeDocumentMapper } from './mapper/administrative-document.mapper';
import { ConstructionWritePersistence } from './persistence-helper/construction-write.persistence';
import { DecisionWritePersistence } from './persistence-helper/decision-write.persistence';
import { AdministrativeDocumentWritePersistence } from './persistence-helper/administrative-document-write.persistence';
import { SubmissionMapper } from './mapper/submission.mapper';
import { SubmissionWritePersistence } from './persistence-helper/submission-write.persistence';
import { ConstructionInfoMapper } from './mapper/construction-info.mapper';
import { ConstructionInfoWritePersistence } from './persistence-helper/construction-info.persistence';
import { BidPackageMapper } from './mapper/bid-package.mapper';
import { BidPackageWritePersistence } from './persistence-helper/bid-package-write.persistence';

@Injectable()
export class DocumentWriteRepository
  extends DocumentBaseRepo
  implements IDocumentWriteRepository
{
  // temporary, hard-dependency
  private readonly _conPersist = new ConstructionWritePersistence();
  private readonly _decPersist = new DecisionWritePersistence();
  private readonly _adDocPersist = new AdministrativeDocumentWritePersistence();
  private readonly _subPersist = new SubmissionWritePersistence();
  private readonly _conInfoPersist = new ConstructionInfoWritePersistence();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  private readonly _bidPackagePersist = new BidPackageWritePersistence();

  constructor(
    connectionService: PgConnectionService,
    @Inject('IUnitOfWork') uow: IUnitOfWork,
  ) {
    super(connectionService, uow);
  }

  async initConstruction(decDomain: Decision): Promise<Decision> {
    const subDomain = decDomain.submissions[0];
    if (!subDomain) {
      throw new Error('Submission is required');
    }
    if (!subDomain.construction_info) {
      throw new Error('Construction info is required');
    }
    if (!subDomain.bid_packages || !Array.isArray(subDomain.bid_packages)) {
      throw new Error('Bid packages is required');
    }

    const client = (await this._uow.begin()) as PoolClient;
    try {
      // construction
      const construction = ConstructionMapper.toPersistence(decDomain);
      await this._conPersist.save(client, construction);

      // decision
      const decRow = DecisionMapper.toPersistence(decDomain);
      await this._decPersist.save(client, decRow);

      // administrative document
      const decisionAdDoc = AdministrativeDocumentMapper.toPersistence(
        decDomain.document,
      );
      await this._adDocPersist.save(client, decisionAdDoc);

      // submission
      // only one submission when initConstruction
      const subRow = SubmissionMapper.toPersistence({
        construction_id: decRow.construction_id,
        submission: subDomain,
      });
      const subAdDocRow = AdministrativeDocumentMapper.toPersistence(
        subDomain.document,
      );
      await this._subPersist.save(client, subRow);
      await this._adDocPersist.save(client, subAdDocRow);

      // construction info
      const infoDomain = subDomain.construction_info;
      const info = ConstructionInfoMapper.toPersistence({
        construction_id: decRow.construction_id,
        submission_id: subDomain.id.value!,
        info: infoDomain,
      });
      await this._conInfoPersist.save(client, info);

      // bid packages
      const bidPackagesArr = subDomain.bid_packages.map((bidPackageDomain) =>
        BidPackageMapper.toPersistence({
          construction_id: decRow.construction_id,
          submission_id: subRow.id,
          bid_package: bidPackageDomain,
        }),
      );

      for (const bpRow of bidPackagesArr) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        await this._bidPackagePersist.save(client, bpRow);
      }

      await this._uow.commit(client);
      return decDomain;
    } catch (error) {
      await this._uow.rollback(client);
      throw error;
    }
  }

  async saveNewDecision(decDomain: Decision): Promise<Decision> {
    const constructionId = decDomain.construction_id.value;
    const submissionId = decDomain.submissions[0]?.id.value;

    await Promise.resolve();
    throw new Error('Method not implemented.');
  }

  async saveExistingDecision(decDomain: Decision): Promise<Decision> {
    await Promise.resolve();
    throw new Error('Method not implemented.');
  }
}
