import { Decision } from '../../entity/decision.entity';
import { CreateSubmissionCommand } from '../../../application/command/create-submission.command';

export interface IDecisionUseCase {
  createDecision(data: CreateSubmissionCommand): Promise<Decision>;
  updateDecision(id: string, data: CreateSubmissionCommand): Promise<Decision>;
  deleteDecision(id: string): Promise<void>;
  getDecisionById(id: string): Promise<Decision>;
  getAllDecisions(): Promise<Decision[]>;
}
