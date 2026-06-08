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
import { DecisionId } from 'src/construction/domain/value-objects/document.vo';
import { BidPackageRow, BidPackageSnapshotRow } from './model/bid-package.row';
import type { IDocumentQueryRepository } from 'src/construction/application/port/outbound/database/document-query.repository.port';

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
    @Inject('IDocumentQueryRepository')
    private readonly _docQueryRepo: IDocumentQueryRepository,
  ) {
    super(connectionService, uow);
  }

  async saveNewDecision(
    conId: string,
    decDomain: Decision,
    poolClient?: PoolClient,
  ): Promise<DecisionId> {
    const client = poolClient || ((await this._uow.begin()) as PoolClient);
    try {
      // decision
      const decRow = DecisionMapper.toPersistence(decDomain);

      // administrative document
      const decisionAdDoc = AdministrativeDocumentMapper.toPersistence(
        decDomain.document,
      );

      await this._adDocPersist.save(client, decisionAdDoc);
      await this._decPersist.save(client, decRow);

      const decId = decDomain.id.value!;
      // only one submission when initConstruction
      const subDomain = decDomain.submissions[0];
      await this._saveSubmission(conId, decId, subDomain, client);

      // if poolClient exist, all DML in a transaction, commit and roll back will occure outthere
      if (!poolClient) {
        await this._uow.commit(client);
      }
      return decDomain.id;
    } catch (error) {
      if (!poolClient) {
        await this._uow.rollback(client);
      }
      throw error;
    }
  }

  async saveExistingDecision(
    conId: string,
    decDomain: Decision,
    poolClient?: PoolClient,
  ): Promise<DecisionId> {
    const decId = decDomain.id.value!;

    const client = poolClient || ((await this._uow.begin()) as PoolClient);
    try {
      const decisionAdDoc = AdministrativeDocumentMapper.toPersistence(
        decDomain.document,
      );
      // update decision document info
      await this._adDocPersist.update(client, decisionAdDoc);

      const subDomain = decDomain.submissions[0];

      await this._saveSubmission(conId, decId, subDomain, client);
      if (!poolClient) {
        await this._uow.commit(client);
      }
      return new DecisionId(decId);
    } catch (error) {
      if (!poolClient) {
        await this._uow.rollback(client);
      }
      throw error;
    }
  }

  private async _saveSubmission(
    conId: string,
    decId: string,
    subDomain: Submission,
    client: PoolClient,
  ) {
    const subRow = SubmissionMapper.toPersistence({
      construction_id: conId,
      decisoin_id: decId,
      submission: subDomain,
    });
    const subAdDocRow = AdministrativeDocumentMapper.toPersistence(
      subDomain.document,
    );
    if (subDomain.id.value) {
      // Update submission info only impact to administrative_documents
      await this._adDocPersist.update(client, subAdDocRow);
    } else {
      await this._adDocPersist.save(client, subAdDocRow);
      await this._subPersist.save(client, subRow);
    }

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
      const bidPackagesRowArr: [BidPackageRow, BidPackageSnapshotRow][] =
        bpDomainsArr.map((bidPackageDomain) => [
          BidPackageMapper.toPersistenceBidPackage({
            construction_id: conId,
            submission_id: subId,
            bid_package: bidPackageDomain,
          }),
          BidPackageMapper.toPersistenceSnapshot({
            construction_id: conId,
            submission_id: subId,
            bid_package: bidPackageDomain,
          }),
        ]);

      for (const bpRow of bidPackagesRowArr) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const isExisted = await this._docQueryRepo.checkExistBidPackage(
          bpRow[0].id,
        );
        // Insert new bp if it doesn't exist
        if (!isExisted) {
          await this._bidPackagePersist.saveBidPackage(client, bpRow[0]);
        }
        // Always insert snapshot
        await this._bidPackagePersist.saveSnapshot(client, bpRow[1]);
      }
    }
  }
}
