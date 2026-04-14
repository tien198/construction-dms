import { Decision } from '../../../../domain/decision.entity';
import { Submission } from '../../../../domain/submission.entity';
import { AdministrativeDocument } from '../../../../domain/administrative-document.entity';
import { ConstructionInforSnapshot } from '../../../../domain/construction-infor.entity';
import { Construction } from 'src/construction/document/domain/construction.entity';
import { BidPackageSnapshot } from 'src/construction/document/domain/bid-package.entity';
import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';
import { DecisionDetailResDto } from '../../../dto/response/get-decision-detail.res-dto';
import { DecisionResDto } from '../../../dto/response/get-decision.res-dto';

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
  findDecisionById(id: string, client?: any): Promise<Decision>;
  findDecisionByPeriod(
    constructionId: string,
    period: ConstructionPeriod,
    client?: any,
  ): Promise<DecisionDetailResDto>;
  findDecisionListOfConstruction(
    constructionId: string,
    client?: any,
  ): Promise<DecisionResDto[]>;
  findTCTDecisionsList(client?: any): Promise<DecisionResDto[]>;
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
export interface IConstructionInforSnapshotRepository {
  saveConstructionInforSnapshot(
    constructionInfoSnapshot: ConstructionInforSnapshot,
    client?: any,
  ): Promise<ConstructionInforSnapshot>;
  updateConstructionInforSnapshot(
    id: string,
    constructionInfoSnapshot: Partial<ConstructionInforSnapshot>,
    client?: any,
  ): Promise<ConstructionInforSnapshot>;
  deleteConstructionInforSnapshot(id: string, client?: any): Promise<void>;
  findConstructionInforSnapshotById(
    id: string,
    client?: any,
  ): Promise<ConstructionInforSnapshot>;
  findAllConstructionInforSnapshots(
    client?: any,
  ): Promise<ConstructionInforSnapshot[]>;
}

export interface IDocumentRepository
  extends
    IConstructionRepository,
    IDecisionRepository,
    ISubmissionRepository,
    IAdministrativeDocumentRepository,
    IBidPackageSnapshotRepository,
    IConstructionInforSnapshotRepository {}
