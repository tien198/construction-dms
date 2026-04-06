import { Decision } from '../../../domain/entity/decision.entity';
import { Submission } from '../../../domain/entity/submission.entity';
import { AdministrativeDocument } from '../../../domain/entity/administrative-document.entity';
import { BidPackageSnapshot } from '../../../domain/entity/bid-package.entity';
import { ConstructionInfoSnapshot } from '../../../domain/entity/construction-infor.entity';
import { Construction } from '../../../domain/entity/construction.entity';

// client is a dedicated db client (maybe pool client), used for transaction

// construction
export interface IConstructionRepository {
  saveConstruction(
    construction: Construction,
    client?: any,
  ): Promise<Construction>;
  updateConstruction(
    id: string,
    construction: Partial<Construction>,
    client?: any,
  ): Promise<Construction>;
  deleteConstruction(id: string, client?: any): Promise<void>;
  findConstructionById(id: string, client?: any): Promise<Construction>;
  findAllConstructions(client?: any): Promise<Construction[]>;
}

// Decitsion
export interface IDecisionRepository {
  saveDecision(decision: Decision, client?: any): Promise<Decision>;
  updateDecision(
    id: string,
    decision: Partial<Decision>,
    client?: any,
  ): Promise<Decision>;
  deleteDecision(id: string, client?: any): Promise<void>;
  findDecisionById(id: string, client?: any): Promise<Decision>;
  findAllDecisions(client?: any): Promise<Decision[]>;
}

// submission
export interface ISubmissionRepository {
  saveSubmission(submission: Submission, client?: any): Promise<Submission>;
  updateSubmission(
    id: string,
    submission: Partial<Submission>,
    client?: any,
  ): Promise<Submission>;
  deleteSubmission(id: string, client?: any): Promise<void>;
  findSubmissionById(id: string, client?: any): Promise<Submission>;
  findAllSubmissions(client?: any): Promise<Submission[]>;
}

// administrative document
export interface IAdministrativeDocumentRepository {
  saveAdministrativeDocument(
    administrativeDocument: AdministrativeDocument,
    client?: any,
  ): Promise<AdministrativeDocument>;
  updateAdministrativeDocument(
    id: string,
    administrativeDocument: Partial<AdministrativeDocument>,
    client?: any,
  ): Promise<AdministrativeDocument>;
  deleteAdministrativeDocument(id: string, client?: any): Promise<void>;
  findAdministrativeDocumentById(
    id: string,
    client?: any,
  ): Promise<AdministrativeDocument>;
  findAllAdministrativeDocuments(
    client?: any,
  ): Promise<AdministrativeDocument[]>;
}

// bid package snapshot
export interface IBidPackageSnapshotRepository {
  saveBidPackageSnapshot(
    bidPackageSnapshot: BidPackageSnapshot,
    client?: any,
  ): Promise<BidPackageSnapshot>;
  updateBidPackageSnapshot(
    id: string,
    bidPackageSnapshot: Partial<BidPackageSnapshot>,
    client?: any,
  ): Promise<BidPackageSnapshot>;
  deleteBidPackageSnapshot(id: string, client?: any): Promise<void>;
  findBidPackageSnapshotById(
    id: string,
    client?: any,
  ): Promise<BidPackageSnapshot>;
  findAllBidPackageSnapshots(client?: any): Promise<BidPackageSnapshot[]>;
}

// construction info snapshot
export interface IConstructionInfoSnapshotRepository {
  saveConstructionInfoSnapshot(
    constructionInfoSnapshot: ConstructionInfoSnapshot,
    client?: any,
  ): Promise<ConstructionInfoSnapshot>;
  updateConstructionInfoSnapshot(
    id: string,
    constructionInfoSnapshot: Partial<ConstructionInfoSnapshot>,
    client?: any,
  ): Promise<ConstructionInfoSnapshot>;
  deleteConstructionInfoSnapshot(id: string, client?: any): Promise<void>;
  findConstructionInfoSnapshotById(
    id: string,
    client?: any,
  ): Promise<ConstructionInfoSnapshot>;
  findAllConstructionInfoSnapshots(
    client?: any,
  ): Promise<ConstructionInfoSnapshot[]>;
}

export interface IDocumentRepository
  extends
    IConstructionRepository,
    IDecisionRepository,
    ISubmissionRepository,
    IAdministrativeDocumentRepository,
    IBidPackageSnapshotRepository,
    IConstructionInfoSnapshotRepository {}
