import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Decision } from '../../domain/entity/decision.entity';
import { IDecisionUseCase } from '../../domain/port/inbound/decision.use-case';
import type { IDecisionRepository } from '../../domain/port/outbound/decision.repository.port';
import { CreateSubmissionCommand } from '../command/create-submission.command';

@Injectable()
export class DecisionService implements IDecisionUseCase {
  constructor(
    @Inject('IDecisionRepository')
    private readonly repository: IDecisionRepository,
  ) {}

  async createDecision(data: CreateSubmissionCommand): Promise<Decision> {
    const decision = new Decision(
      data.id || '',
      data.construction_id,
      data.period,
      data.is_change_construction_infor,
    );
    return this.repository.saveDecision(decision);
  }

  async updateDecision(
    id: string,
    data: CreateSubmissionCommand,
  ): Promise<Decision> {
    const existing = await this.repository.findDecisionById(id);
    if (!existing) {
      throw new NotFoundException(`Decision with ID ${id} not found`);
    }
    return this.repository.updateDecision(id, data);
  }

  async deleteDecision(id: string): Promise<void> {
    const existing = await this.repository.findDecisionById(id);
    if (!existing) {
      throw new NotFoundException(`Decision with ID ${id} not found`);
    }
    await this.repository.deleteDecision(id);
  }

  async getDecisionById(id: string): Promise<Decision> {
    const decision = await this.repository.findDecisionById(id);
    if (!decision) {
      throw new NotFoundException(`Decision with ID ${id} not found`);
    }
    return decision;
  }

  async getAllDecisions(): Promise<Decision[]> {
    return this.repository.findAllDecisions();
  }
}
