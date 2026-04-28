import { Inject, Injectable } from '@nestjs/common';

import type { IUnitOfWork } from 'src/construction/application/port/outbound/database/i-unit-of-work.port';
import type { PoolClient } from 'pg';

import { PgConnectionService } from 'src/shared/infrastructure/persistence/psql/pg-connection.service';
import { BaseRepo } from './base.repository';
import { IDocumentWriteRepository } from '../../../../application/port/outbound/database/document-write.repository.port';
import { Decision } from 'src/construction/domain/document/decision.entity';
import { DecisionMapper } from './mapper/decision.mapper';
import { AdministrativeDocumentMapper } from './mapper/administrative-document.mapper';
import { DecisionWritePersistence } from './persistence-helper/decision-write.persistence';
import { AdministrativeDocumentWritePersistence } from './persistence-helper/administrative-document-write.persistence';
import { SubmissionMapper } from './mapper/submission.mapper';
import { SubmissionWritePersistence } from './persistence-helper/submission-write.persistence';
import { ConstructionInfoMapper } from './mapper/construction-info.mapper';
import { ConstructionInfoWritePersistence } from './persistence-helper/construction-info.persistence';
import { BidPackageMapper } from './mapper/bid-package.mapper';
import { BidPackageWritePersistence } from './persistence-helper/bid-package-write.persistence';
import { Submission } from 'src/construction/domain/document/submission.entity';

@Injectable()
export class DocumentWriteRepository
  extends BaseRepo
  implements IDocumentWriteRepository
{
  // temporary, hard-dependency
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

  async saveNewDecision(
    conId: string,
    decDomain: Decision,
    poolClient?: PoolClient,
  ): Promise<Decision> {
    /*
    if (!subDomain) {
      throw new Error('Submission is required');
    }
    if (!subDomain.construction_info) {
      throw new Error('Construction info is required');
    }
    if (!subDomain.bid_packages || !Array.isArray(subDomain.bid_packages)) {
      throw new Error('Bid packages is required');
    }
      */

    const client = poolClient || ((await this._uow.begin()) as PoolClient);
    try {
      // construction
      /*
      const construction = ConstructionMapper.toPersistence(decDomain);
      await this._conPersist.save(client, construction);
*/
      // decision
      const decRow = DecisionMapper.toPersistence(decDomain);
      await this._decPersist.save(client, decRow);

      // administrative document
      const decisionAdDoc = AdministrativeDocumentMapper.toPersistence(
        decDomain.document,
      );
      await this._adDocPersist.save(client, decisionAdDoc);

      await this._saveSubmission(conId, decDomain, client);

      // if poolClient exist, all DML in a transaction, commit and roll back will occure outthere
      if (!poolClient) {
        await this._uow.commit(client);
      }
      return decDomain;
    } catch (error) {
      if (!poolClient) {
        await this._uow.rollback(client);
      }
      throw error;
    }
  }

  async saveExistingDecision(
    decId: string,
    decision: Decision,
    poolClient?: PoolClient,
  ): Promise<Decision> {
    const client = poolClient || ((await this._uow.begin()) as PoolClient);
    try {
      await this._saveSubmission(decId, decision, client);
      if (!poolClient) {
        await this._uow.commit(client);
      }
      return decision;
    } catch (error) {
      if (!poolClient) {
        await this._uow.rollback(client);
      }
      throw error;
    }
  }

  async editSubmission(
    conId: string,
    subId: string,
    decDomain: Decision,
    poolClient?: PoolClient,
  ): Promise<void> {
    const client = poolClient || ((await this._uow.begin()) as PoolClient);
    try {
      // only one submission when initConstruction
      const subDomain = decDomain.submissions[0];

      await this._saveConInfoAndBidPackages(conId, subId, subDomain, client);
      if (!poolClient) {
        await this._uow.commit(client);
      }
    } catch (error) {
      if (!poolClient) {
        await this._uow.rollback(client);
      }
      throw error;
    }
  }

  private async _saveSubmission(
    conId: string,
    decDomain: Decision,
    client: PoolClient,
  ) {
    // submission
    // only one submission when initConstruction
    const subDomain = decDomain.submissions[0];

    const subRow = SubmissionMapper.toPersistence({
      construction_id: conId,
      submission: subDomain,
    });
    const subAdDocRow = AdministrativeDocumentMapper.toPersistence(
      subDomain.document,
    );
    await this._subPersist.save(client, subRow);
    await this._adDocPersist.save(client, subAdDocRow);

    await this._saveConInfoAndBidPackages(conId, subRow.id, subDomain, client);
  }

  private async _saveConInfoAndBidPackages(
    conId: string,
    subId: string,
    subDomain: Submission,
    client: PoolClient,
  ) {
    // construction info
    const infoDomain = subDomain.construction_info;
    if (infoDomain) {
      const info = ConstructionInfoMapper.toPersistence({
        construction_id: conId,
        submission_id: subId,
        info: infoDomain,
      });
      await this._conInfoPersist.save(client, info);
    }

    // bid packages
    const bpDomainsArr = subDomain.bid_packages;
    if (bpDomainsArr) {
      const bidPackagesRowArr = bpDomainsArr.map((bidPackageDomain) =>
        BidPackageMapper.toPersistence({
          construction_id: conId,
          submission_id: subId,
          bid_package: bidPackageDomain,
        }),
      );

      for (const bpRow of bidPackagesRowArr) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        await this._bidPackagePersist.save(client, bpRow);
      }
    }
  }
}
