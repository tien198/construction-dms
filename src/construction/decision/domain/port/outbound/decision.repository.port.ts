import { Decision } from '../../entity/decision.entity';
import { Submission } from '../../entity/submission.entity';
import { AdministrativeDocument } from '../../entity/administrative-document.entity';
import { BidPackageSnapshot } from '../../entity/bid-package.entity';
import { ConstructionInfoSnapshot } from '../../entity/construction-infor.entity';

interface IDecisionRepository {
  saveDecision(decision: Decision): Promise<Decision>;
  updateDecision(id: string, decision: Partial<Decision>): Promise<Decision>;
  deleteDecision(id: string): Promise<void>;
  findDecisionById(id: string): Promise<Decision | null>;
  findAllDecisions(): Promise<Decision[]>;
}

// submission
interface IDecisionRepository {
  saveSubmission(submission: Submission): Promise<Submission>;
  updateSubmission(
    id: string,
    submission: Partial<Submission>,
  ): Promise<Submission>;
  deleteSubmission(id: string): Promise<void>;
  findSubmissionById(id: string): Promise<Submission | null>;
  findAllSubmissions(): Promise<Submission[]>;
}

// administrative document
interface IDecisionRepository {
  saveAdministrativeDocument(
    administrativeDocument: AdministrativeDocument,
  ): Promise<AdministrativeDocument>;
  updateAdministrativeDocument(
    id: string,
    administrativeDocument: Partial<AdministrativeDocument>,
  ): Promise<AdministrativeDocument>;
  deleteAdministrativeDocument(id: string): Promise<void>;
  findAdministrativeDocumentById(
    id: string,
  ): Promise<AdministrativeDocument | null>;
  findAllAdministrativeDocuments(): Promise<AdministrativeDocument[]>;
}

// bid package snapshot
interface IDecisionRepository {
  saveBidPackageSnapshot(
    bidPackageSnapshot: BidPackageSnapshot,
  ): Promise<BidPackageSnapshot>;
  updateBidPackageSnapshot(
    id: string,
    bidPackageSnapshot: Partial<BidPackageSnapshot>,
  ): Promise<BidPackageSnapshot>;
  deleteBidPackageSnapshot(id: string): Promise<void>;
  findBidPackageSnapshotById(id: string): Promise<BidPackageSnapshot | null>;
  findAllBidPackageSnapshots(): Promise<BidPackageSnapshot[]>;
}

// construction info snapshot
interface IDecisionRepository {
  saveConstructionInfoSnapshot(
    constructionInfoSnapshot: ConstructionInfoSnapshot,
  ): Promise<ConstructionInfoSnapshot>;
  updateConstructionInfoSnapshot(
    id: string,
    constructionInfoSnapshot: Partial<ConstructionInfoSnapshot>,
  ): Promise<ConstructionInfoSnapshot>;
  deleteConstructionInfoSnapshot(id: string): Promise<void>;
  findConstructionInfoSnapshotById(
    id: string,
  ): Promise<ConstructionInfoSnapshot | null>;
  findAllConstructionInfoSnapshots(): Promise<ConstructionInfoSnapshot[]>;
}

export type { IDecisionRepository };
