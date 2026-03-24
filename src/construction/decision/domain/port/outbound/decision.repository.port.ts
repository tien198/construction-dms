import { Decision } from '../../entity/decision.entity';

export interface IDecisionRepository {
  save(decision: Decision): Promise<Decision>;
  update(id: string, decision: Partial<Decision>): Promise<Decision>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Decision | null>;
  findAll(): Promise<Decision[]>;
}
