import { Decision } from 'src/construction/domain/document/decision.entity';

export interface IDocumentWriteRepository {
  initConstruction(decision: Decision): Promise<Decision>;
  saveNewDecision(decision: Decision): Promise<Decision>;
  saveExistingDecision(decision: Decision): Promise<Decision>;
}
