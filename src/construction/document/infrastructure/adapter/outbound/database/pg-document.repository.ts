import { Injectable } from '@nestjs/common';
import { IDocumentRepository } from '../../../../application/port/outbound/database/document.repository.port';
import { Construction } from 'src/construction/document/domain/construction.entity';
import { Decision } from 'src/construction/document/domain/decision.entity';
import { Submission } from 'src/construction/document/domain/submission.entity';
import { AdministrativeDocument } from 'src/construction/document/domain/administrative-document.entity';
import { BidPackageSnapshot } from 'src/construction/document/domain/bid-package.entity';
import { ConstructionInforSnapshot } from 'src/construction/document/domain/construction-infor.entity';

import { PgDecisionRepository as DecRepo } from './_document.repositorie/pg-decision.repository';
import { PgSubmissionRepository as SubRepo } from './_document.repositorie/pg-submission.repository';
import { PgAdministrativeDocumentRepository as AdminDocRepo } from './_document.repositorie/pg-administrative-document.repository';
import { PgBidPackageSnapshotRepository as BidPkgSnapRepo } from './_document.repositorie/pg-bid-package-snapshot.repository';
import { PgConstructionInforSnapshotRepository as ConInforSnapRepo } from './_document.repositorie/pg-construction-info-snapshot.repository';
import { PgConstructionRepository as ConRepo } from './_document.repositorie/pg-construction.respositoty';
import { PgConnectionService } from 'src/shared/infrastructure/database/psql/pg-connection.service';
import { PoolClient } from 'pg';
import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';
import { DecisionDetailResDto } from 'src/construction/document/application/dto/response/get-decision-detail.res-dto';
import { DecisionResDto } from 'src/construction/document/application/dto/response/get-decision.res-dto';

@Injectable()
export class PgDocumentRepository implements IDocumentRepository {
  private readonly _consRepo: ConRepo;
  private readonly _decRepo: DecRepo;
  private readonly _subRepo: SubRepo;
  private readonly _adminDocRepo: AdminDocRepo;
  private readonly _bidPkgSnapRepo: BidPkgSnapRepo;
  private readonly _conInforSnapRepo: ConInforSnapRepo;

  constructor(connectionService: PgConnectionService) {
    // getInstance the first time to lazy instantiate singleton instances
    this._consRepo = ConRepo.getInstance(connectionService);
    this._decRepo = DecRepo.getInstance(connectionService);
    this._subRepo = SubRepo.getInstance(connectionService);
    this._adminDocRepo = AdminDocRepo.getInstance(connectionService);
    this._bidPkgSnapRepo = BidPkgSnapRepo.getInstance(connectionService);
    this._conInforSnapRepo = ConInforSnapRepo.getInstance(connectionService);
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

  findDecisionById(id: string, client?: PoolClient): Promise<Decision> {
    return this._decRepo.findDecisionById(id, client);
  }

  findDecisionByPeriod(
    constructionId: string,
    period: ConstructionPeriod,
    client?: any,
  ): Promise<DecisionDetailResDto> {
    return this._decRepo.findDecisionByPeriod(constructionId, period, client);
  }

  findDecisionListOfConstruction(
    constructionId: string,
    client?: any,
  ): Promise<DecisionResDto[]> {
    return this._decRepo.findDecisionListOfConstruction(constructionId, client);
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
  saveConstructionInforSnapshot(
    constructionInfoSnapshot: ConstructionInforSnapshot,
    client?: PoolClient,
  ): Promise<ConstructionInforSnapshot> {
    return this._conInforSnapRepo.saveConstructionInforSnapshot(
      constructionInfoSnapshot,
      client,
    );
  }
  updateConstructionInforSnapshot(
    id: string,
    constructionInfoSnapshot: Partial<ConstructionInforSnapshot>,
    client?: PoolClient,
  ): Promise<ConstructionInforSnapshot> {
    return this._conInforSnapRepo.updateConstructionInforSnapshot(
      id,
      constructionInfoSnapshot,
      client,
    );
  }
  deleteConstructionInforSnapshot(
    id: string,
    client?: PoolClient,
  ): Promise<void> {
    return this._conInforSnapRepo.deleteConstructionInforSnapshot(id, client);
  }
  findConstructionInforSnapshotById(
    id: string,
    client?: PoolClient,
  ): Promise<ConstructionInforSnapshot> {
    return this._conInforSnapRepo.findConstructionInforSnapshotById(id, client);
  }
  findAllConstructionInforSnapshots(
    client?: PoolClient,
  ): Promise<ConstructionInforSnapshot[]> {
    return this._conInforSnapRepo.findAllConstructionInforSnapshots(client);
  }
}
