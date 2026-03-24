import { Decision } from '../../entity/decision.entity';
import { CreateSubmissionDto } from '../../../infrastructure/adapter/dto/create-submission.dto';

export interface IDecisionUseCase {
  createDecision(data: CreateSubmissionDto): Promise<Decision>;
  updateDecision(id: string, data: CreateSubmissionDto): Promise<Decision>;
  deleteDecision(id: string): Promise<void>;
  getDecisionById(id: string): Promise<Decision>;
  getAllDecisions(): Promise<Decision[]>;
}
