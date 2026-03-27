/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { IDocumentRepository } from '../../../../application/port/outbound/document.repository.port';
import { Decision } from '../../../../domain/entity/decision.entity';

@Injectable()
export class PgDecisionRepository implements Pick<
  IDocumentRepository,
  | 'saveDecision'
  | 'updateDecision'
  | 'deleteDecision'
  | 'findDecisionById'
  | 'findAllDecisions'
> {
  saveDecision(decision: Decision): Promise<Decision> {
    throw new Error('Method not implemented.');
  }
  updateDecision(id: string, decision: Partial<Decision>): Promise<Decision> {
    throw new Error('Method not implemented.');
  }
  deleteDecision(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findDecisionById(id: string): Promise<Decision | null> {
    throw new Error('Method not implemented.');
  }
  findAllDecisions(): Promise<Decision[]> {
    throw new Error('Method not implemented.');
  }
}
