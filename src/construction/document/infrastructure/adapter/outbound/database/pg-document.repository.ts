import { Injectable } from '@nestjs/common';
import { IDocumentRepository } from '../../../../application/port/outbound/database/document.repository.port';
import { Construction } from 'src/construction/document/domain/construction.entity';
import { Decision } from 'src/construction/document/domain/decision.entity';
import { Submission } from 'src/construction/document/domain/submission.entity';
import { AdministrativeDocument } from 'src/construction/document/domain/administrative-document.entity';
import { BidPackageSnapshot } from 'src/construction/document/domain/bid-package.entity';
import { ConstructionInforSnapshot } from 'src/construction/document/domain/construction-infor.entity';

import { PgDecisionRepository as DecRepo } from './repositories/pg-decision.repository';
import { PgSubmissionRepository as SubRepo } from './repositories/pg-submission.repository';
import { PgAdministrativeDocumentRepository as AdminDocRepo } from './repositories/pg-administrative-document.repository';
import { PgBidPackageSnapshotRepository as BidPkgSnapRepo } from './repositories/pg-bid-package-snapshot.repository';
import { PgConstructionInfoSnapshotRepository as ConInforSnapRepo } from './repositories/pg-construction-info-snapshot.repository';
import { PgConstructionRepository as ConRepo } from './repositories/pg-construction.respositoty';
import { PgConnectionService } from 'src/shared/infrastructure/database/psql/pg-connection.service';
import { PoolClient } from 'pg';

@Injectable()
export class PgDocumentRepository implements IDocumentRepository {
  private readonly _consRepo: ConRepo;
  private readonly _decRepo: DecRepo;
  private readonly _subRepo: SubRepo;
  private readonly _adminDocRepo: AdminDocRepo;
  private readonly _bidPkgSnapRepo: BidPkgSnapRepo;
  private readonly _conInforSnapRepo: ConInforSnapRepo;

  constructor(poolService: PgConnectionService) {
    // getInstance the first time to lazy instantiate singleton instances
    this._consRepo = ConRepo.getInstance(poolService);
    this._decRepo = DecRepo.getInstance(poolService);
    this._subRepo = SubRepo.getInstance(poolService);
    this._adminDocRepo = AdminDocRepo.getInstance(poolService);
    this._bidPkgSnapRepo = BidPkgSnapRepo.getInstance(poolService);
    this._conInforSnapRepo = ConInforSnapRepo.getInstance(poolService);
  }
  // Construction
  saveConstruction(
    construction: Construction,
    client?: PoolClient,
  ): Promise<Construction> {
    return this._consRepo.saveConstruction(construction, client);
  }
  updateConstruction(
    id: string,
    construction: Partial<Construction>,
    client?: PoolClient,
  ): Promise<Construction> {
    return this._consRepo.updateConstruction(id, construction, client);
  }
  deleteConstruction(id: string, client?: PoolClient): Promise<void> {
    return this._consRepo.deleteConstruction(id, client);
  }
  findConstructionById(id: string, client?: PoolClient): Promise<Construction> {
    return this._consRepo.findConstructionById(id, client);
  }
  findAllConstructions(client?: PoolClient): Promise<Construction[]> {
    return this._consRepo.findAllConstructions(client);
  }

  // Decision
  saveDecision(decision: Decision, client?: PoolClient): Promise<Decision> {
    return this._decRepo.saveDecision(decision, client);
  }
  updateDecision(
    id: string,
    decision: Partial<Decision>,
    client?: PoolClient,
  ): Promise<Decision> {
    return this._decRepo.updateDecision(id, decision, client);
  }
  deleteDecision(id: string, client?: PoolClient): Promise<void> {
    return this._decRepo.deleteDecision(id, client);
  }
  findDecisionById(id: string, client?: PoolClient): Promise<Decision> {
    return this._decRepo.findDecisionById(id, client);
  }
  findAllDecisions(client?: PoolClient): Promise<Decision[]> {
    return this._decRepo.findAllDecisions(client);
  }

  // Submission
  saveSubmission(
    submission: Submission,
    client?: PoolClient,
  ): Promise<Submission> {
    return this._subRepo.saveSubmission(submission, client);
  }
  updateSubmission(
    id: string,
    submission: Partial<Submission>,
    client?: PoolClient,
  ): Promise<Submission> {
    return this._subRepo.updateSubmission(id, submission, client);
  }
  deleteSubmission(id: string, client?: PoolClient): Promise<void> {
    return this._subRepo.deleteSubmission(id, client);
  }
  findSubmissionById(id: string, client?: PoolClient): Promise<Submission> {
    return this._subRepo.findSubmissionById(id, client);
  }
  findAllSubmissions(client?: PoolClient): Promise<Submission[]> {
    return this._subRepo.findAllSubmissions(client);
  }

  // Administrative Document
  saveAdministrativeDocument(
    administrativeDocument: AdministrativeDocument,
    client?: PoolClient,
  ): Promise<AdministrativeDocument> {
    return this._adminDocRepo.saveAdministrativeDocument(
      administrativeDocument,
      client,
    );
  }
  updateAdministrativeDocument(
    id: string,
    administrativeDocument: Partial<AdministrativeDocument>,
    client?: PoolClient,
  ): Promise<AdministrativeDocument> {
    return this._adminDocRepo.updateAdministrativeDocument(
      id,
      administrativeDocument,
      client,
    );
  }
  deleteAdministrativeDocument(id: string, client?: PoolClient): Promise<void> {
    return this._adminDocRepo.deleteAdministrativeDocument(id, client);
  }
  findAdministrativeDocumentById(
    id: string,
    client?: PoolClient,
  ): Promise<AdministrativeDocument> {
    return this._adminDocRepo.findAdministrativeDocumentById(id, client);
  }
  findAllAdministrativeDocuments(
    client?: PoolClient,
  ): Promise<AdministrativeDocument[]> {
    return this._adminDocRepo.findAllAdministrativeDocuments(client);
  }

  // Bid Package Snapshot
  saveBidPackageSnapshot(
    bidPackageSnapshot: BidPackageSnapshot,
    client?: PoolClient,
  ): Promise<BidPackageSnapshot> {
    return this._bidPkgSnapRepo.saveBidPackageSnapshot(
      bidPackageSnapshot,
      client,
    );
  }
  updateBidPackageSnapshot(
    id: string,
    bidPackageSnapshot: Partial<BidPackageSnapshot>,
    client?: PoolClient,
  ): Promise<BidPackageSnapshot> {
    return this._bidPkgSnapRepo.updateBidPackageSnapshot(
      id,
      bidPackageSnapshot,
      client,
    );
  }
  deleteBidPackageSnapshot(id: string, client?: PoolClient): Promise<void> {
    return this._bidPkgSnapRepo.deleteBidPackageSnapshot(id, client);
  }
  findBidPackageSnapshotById(
    id: string,
    client?: PoolClient,
  ): Promise<BidPackageSnapshot> {
    return this._bidPkgSnapRepo.findBidPackageSnapshotById(id, client);
  }
  findAllBidPackageSnapshots(
    client?: PoolClient,
  ): Promise<BidPackageSnapshot[]> {
    return this._bidPkgSnapRepo.findAllBidPackageSnapshots(client);
  }

  // Construction Info Snapshot
  saveConstructionInfoSnapshot(
    constructionInfoSnapshot: ConstructionInforSnapshot,
    client?: PoolClient,
  ): Promise<ConstructionInforSnapshot> {
    return this._conInforSnapRepo.saveConstructionInfoSnapshot(
      constructionInfoSnapshot,
      client,
    );
  }
  updateConstructionInfoSnapshot(
    id: string,
    constructionInfoSnapshot: Partial<ConstructionInforSnapshot>,
    client?: PoolClient,
  ): Promise<ConstructionInforSnapshot> {
    return this._conInforSnapRepo.updateConstructionInfoSnapshot(
      id,
      constructionInfoSnapshot,
      client,
    );
  }
  deleteConstructionInfoSnapshot(
    id: string,
    client?: PoolClient,
  ): Promise<void> {
    return this._conInforSnapRepo.deleteConstructionInfoSnapshot(id, client);
  }
  findConstructionInfoSnapshotById(
    id: string,
    client?: PoolClient,
  ): Promise<ConstructionInforSnapshot> {
    return this._conInforSnapRepo.findConstructionInfoSnapshotById(id, client);
  }
  findAllConstructionInfoSnapshots(
    client?: PoolClient,
  ): Promise<ConstructionInforSnapshot[]> {
    return this._conInforSnapRepo.findAllConstructionInfoSnapshots(client);
  }
}
