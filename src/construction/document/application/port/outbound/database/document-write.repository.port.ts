import { Decision } from '../../../../domain/decision.entity';

export interface IDocumentWriteRepository {
  saveDecision(decision: Decision): Promise<Decision>;
}
