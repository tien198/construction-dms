import { Decision } from '../../../domain/entity/decision.entity';
import { Submission } from '../../../domain/entity/submission.entity';
import { AdministrativeDocument } from '../../../domain/entity/administrative-document.entity';
import { BidPackageSnapshot } from '../../../domain/entity/bid-package.entity';
import { ConstructionInfoSnapshot } from '../../../domain/entity/construction-infor.entity';
import { Construction } from '../../../domain/entity/construction.entity';

// construction
interface IDocumentRepository {
  saveConstruction(construction: Construction): Promise<Construction>;
  updateConstruction(
    id: string,
    construction: Partial<Construction>,
  ): Promise<Construction>;
  deleteConstruction(id: string): Promise<void>;
  findConstructionById(id: string): Promise<Construction | null>;
  findAllConstructions(): Promise<Construction[]>;
}

// Decitsion
interface IDocumentRepository {
  saveDecision(decision: Decision): Promise<Decision>;
  updateDecision(id: string, decision: Partial<Decision>): Promise<Decision>;
  deleteDecision(id: string): Promise<void>;
  findDecisionById(id: string): Promise<Decision | null>;
  findAllDecisions(): Promise<Decision[]>;
}

// submission
interface IDocumentRepository {
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
interface IDocumentRepository {
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
interface IDocumentRepository {
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
interface IDocumentRepository {
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

export type { IDocumentRepository };
