import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Decision } from '../../domain/entity/decision.entity';
import { IDecisionUseCase } from '../../domain/port/inbound/decision.use-case';
import type { IDecisionRepository } from '../../domain/port/outbound/decision.repository.port';
import { CreateSubmissionDto } from '../../infrastructure/adapter/dto/create-submission.dto';

@Injectable()
export class DecisionService implements IDecisionUseCase {
  constructor(
    @Inject('IDecisionRepository')
    private readonly repository: IDecisionRepository,
  ) {}

  async createDecision(data: CreateSubmissionDto): Promise<Decision> {
    const decision = new Decision(
      data.id || '',
      data.construction_id,
      data.period,
      data.is_change_construction_infor,
    );
    return this.repository.save(decision);
  }

  async updateDecision(
    id: string,
    data: CreateSubmissionDto,
  ): Promise<Decision> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Decision with ID ${id} not found`);
    }
    return this.repository.update(id, data);
  }

  async deleteDecision(id: string): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Decision with ID ${id} not found`);
    }
    await this.repository.delete(id);
  }

  async getDecisionById(id: string): Promise<Decision> {
    const decision = await this.repository.findById(id);
    if (!decision) {
      throw new NotFoundException(`Decision with ID ${id} not found`);
    }
    return decision;
  }

  async getAllDecisions(): Promise<Decision[]> {
    return this.repository.findAll();
  }
}
