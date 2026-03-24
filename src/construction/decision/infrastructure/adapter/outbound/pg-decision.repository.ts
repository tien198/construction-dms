import { Injectable } from '@nestjs/common';
import { IDecisionRepository } from '../../../domain/port/outbound/decision.repository.port';
import { Decision } from '../../../domain/entity/decision.entity';
import { Submission } from '../../../domain/entity/submission.entity';
import { AdministrativeDocument } from '../../../domain/entity/administrative-document.entity';
import { BidPackageSnapshot } from '../../../domain/entity/bid-package.entity';
import { ConstructionInfoSnapshot } from '../../../domain/entity/construction-infor.entity';

import { PgBaseDecisionRepository } from './repositories/pg-base-decision.repository';
import { PgSubmissionRepository } from './repositories/pg-submission.repository';
import { PgAdministrativeDocumentRepository } from './repositories/pg-administrative-document.repository';
import { PgBidPackageSnapshotRepository } from './repositories/pg-bid-package-snapshot.repository';
import { PgConstructionInfoSnapshotRepository } from './repositories/pg-construction-info-snapshot.repository';

@Injectable()
export class PgDecisionRepository implements IDecisionRepository {
  constructor(
    private readonly baseDecisionRepository: PgBaseDecisionRepository,
    private readonly submissionRepository: PgSubmissionRepository,
    private readonly administrativeDocumentRepository: PgAdministrativeDocumentRepository,
    private readonly bidPackageSnapshotRepository: PgBidPackageSnapshotRepository,
    private readonly constructionInfoSnapshotRepository: PgConstructionInfoSnapshotRepository,
  ) {}

  // Decision
  saveDecision(decision: Decision): Promise<Decision> {
    return this.baseDecisionRepository.saveDecision(decision);
  }
  updateDecision(id: string, decision: Partial<Decision>): Promise<Decision> {
    return this.baseDecisionRepository.updateDecision(id, decision);
  }
  deleteDecision(id: string): Promise<void> {
    return this.baseDecisionRepository.deleteDecision(id);
  }
  findDecisionById(id: string): Promise<Decision | null> {
    return this.baseDecisionRepository.findDecisionById(id);
  }
  findAllDecisions(): Promise<Decision[]> {
    return this.baseDecisionRepository.findAllDecisions();
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
