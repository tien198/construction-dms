import { Injectable } from '@nestjs/common';
import { IDocumentRepository } from '../../../application/port/outbound/document.repository.port';
import { Construction } from 'src/construction/document/domain/entity/construction.entity';
import { Decision } from '../../../domain/entity/decision.entity';
import { Submission } from '../../../domain/entity/submission.entity';
import { AdministrativeDocument } from '../../../domain/entity/administrative-document.entity';
import { BidPackageSnapshot } from '../../../domain/entity/bid-package.entity';
import { ConstructionInfoSnapshot } from '../../../domain/entity/construction-infor.entity';

import { PgDecisionRepository } from './repositories/pg-base-decision.repository';
import { PgSubmissionRepository } from './repositories/pg-submission.repository';
import { PgAdministrativeDocumentRepository } from './repositories/pg-administrative-document.repository';
import { PgBidPackageSnapshotRepository } from './repositories/pg-bid-package-snapshot.repository';
import { PgConstructionInfoSnapshotRepository } from './repositories/pg-construction-info-snapshot.repository';
import { PgConstructionRepository } from './repositories/pg-construction.respositoty';

@Injectable()
export class PgDocumentRepository implements IDocumentRepository {
  constructor(
    private readonly constructionRepository: PgConstructionRepository,
    private readonly decisionRepository: PgDecisionRepository,
    private readonly submissionRepository: PgSubmissionRepository,
    private readonly administrativeDocumentRepository: PgAdministrativeDocumentRepository,
    private readonly bidPackageSnapshotRepository: PgBidPackageSnapshotRepository,
    private readonly constructionInfoSnapshotRepository: PgConstructionInfoSnapshotRepository,
  ) {}
  // Construction
  saveConstruction(construction: Construction): Promise<Construction> {
    return this.constructionRepository.saveConstruction(construction);
  }
  updateConstruction(
    id: string,
    construction: Partial<Construction>,
  ): Promise<Construction> {
    return this.constructionRepository.updateConstruction(id, construction);
  }
  deleteConstruction(id: string): Promise<void> {
    return this.constructionRepository.deleteConstruction(id);
  }
  findConstructionById(id: string): Promise<Construction | null> {
    return this.constructionRepository.findConstructionById(id);
  }
  findAllConstructions(): Promise<Construction[]> {
    return this.constructionRepository.findAllConstructions();
  }

  // Decision
  saveDecision(decision: Decision): Promise<Decision> {
    return this.decisionRepository.saveDecision(decision);
  }
  updateDecision(id: string, decision: Partial<Decision>): Promise<Decision> {
    return this.decisionRepository.updateDecision(id, decision);
  }
  deleteDecision(id: string): Promise<void> {
    return this.decisionRepository.deleteDecision(id);
  }
  findDecisionById(id: string): Promise<Decision | null> {
    return this.decisionRepository.findDecisionById(id);
  }
  findAllDecisions(): Promise<Decision[]> {
    return this.decisionRepository.findAllDecisions();
  }

  // Submission
  saveSubmission(submission: Submission): Promise<Submission> {
    return this.submissionRepository.saveSubmission(submission);
  }
  updateSubmission(
    id: string,
    submission: Partial<Submission>,
  ): Promise<Submission> {
    return this.submissionRepository.updateSubmission(id, submission);
  }
  deleteSubmission(id: string): Promise<void> {
    return this.submissionRepository.deleteSubmission(id);
  }
  findSubmissionById(id: string): Promise<Submission | null> {
    return this.submissionRepository.findSubmissionById(id);
  }
  findAllSubmissions(): Promise<Submission[]> {
    return this.submissionRepository.findAllSubmissions();
  }

  // Administrative Document
  saveAdministrativeDocument(
    administrativeDocument: AdministrativeDocument,
  ): Promise<AdministrativeDocument> {
    return this.administrativeDocumentRepository.saveAdministrativeDocument(
      administrativeDocument,
    );
  }
  updateAdministrativeDocument(
    id: string,
    administrativeDocument: Partial<AdministrativeDocument>,
  ): Promise<AdministrativeDocument> {
    return this.administrativeDocumentRepository.updateAdministrativeDocument(
      id,
      administrativeDocument,
    );
  }
  deleteAdministrativeDocument(id: string): Promise<void> {
    return this.administrativeDocumentRepository.deleteAdministrativeDocument(
      id,
    );
  }
  findAdministrativeDocumentById(
    id: string,
  ): Promise<AdministrativeDocument | null> {
    return this.administrativeDocumentRepository.findAdministrativeDocumentById(
      id,
    );
  }
  findAllAdministrativeDocuments(): Promise<AdministrativeDocument[]> {
    return this.administrativeDocumentRepository.findAllAdministrativeDocuments();
  }

  // Bid Package Snapshot
  saveBidPackageSnapshot(
    bidPackageSnapshot: BidPackageSnapshot,
  ): Promise<BidPackageSnapshot> {
    return this.bidPackageSnapshotRepository.saveBidPackageSnapshot(
      bidPackageSnapshot,
    );
  }
  updateBidPackageSnapshot(
    id: string,
    bidPackageSnapshot: Partial<BidPackageSnapshot>,
  ): Promise<BidPackageSnapshot> {
    return this.bidPackageSnapshotRepository.updateBidPackageSnapshot(
      id,
      bidPackageSnapshot,
    );
  }
  deleteBidPackageSnapshot(id: string): Promise<void> {
    return this.bidPackageSnapshotRepository.deleteBidPackageSnapshot(id);
  }
  findBidPackageSnapshotById(id: string): Promise<BidPackageSnapshot | null> {
    return this.bidPackageSnapshotRepository.findBidPackageSnapshotById(id);
  }
  findAllBidPackageSnapshots(): Promise<BidPackageSnapshot[]> {
    return this.bidPackageSnapshotRepository.findAllBidPackageSnapshots();
  }

  // Construction Info Snapshot
  saveConstructionInfoSnapshot(
    constructionInfoSnapshot: ConstructionInfoSnapshot,
  ): Promise<ConstructionInfoSnapshot> {
    return this.constructionInfoSnapshotRepository.saveConstructionInfoSnapshot(
      constructionInfoSnapshot,
    );
  }
  updateConstructionInfoSnapshot(
    id: string,
    constructionInfoSnapshot: Partial<ConstructionInfoSnapshot>,
  ): Promise<ConstructionInfoSnapshot> {
    return this.constructionInfoSnapshotRepository.updateConstructionInfoSnapshot(
      id,
      constructionInfoSnapshot,
    );
  }
  deleteConstructionInfoSnapshot(id: string): Promise<void> {
    return this.constructionInfoSnapshotRepository.deleteConstructionInfoSnapshot(
      id,
    );
  }
  findConstructionInfoSnapshotById(
    id: string,
  ): Promise<ConstructionInfoSnapshot | null> {
    return this.constructionInfoSnapshotRepository.findConstructionInfoSnapshotById(
      id,
    );
  }
  findAllConstructionInfoSnapshots(): Promise<ConstructionInfoSnapshot[]> {
    return this.constructionInfoSnapshotRepository.findAllConstructionInfoSnapshots();
  }
}
