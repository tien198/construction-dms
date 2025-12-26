import { Injectable } from '@nestjs/common';
import { Construction } from 'src/construction/domain/type/construction.type';
import { ConstructionRespo } from '../infrastructure/construction.respo';
import { Submission } from '../domain/type/submission.type';
import { Decision } from '../domain/type/decision.type';
import { ConstructionInfraMapper } from '../infrastructure/mapper/construction.mapper';
import { DecisionInfraMapper } from '../infrastructure/mapper/decision.infra.mapper';
import { SubmissionInfraMapper } from '../infrastructure/mapper/submission.mapper';
import { InfraConstructionImp } from '../infrastructure/entities/construction.infra.entity';

@Injectable()
export class ConstructionService {
  constructor(
    private readonly constructionRespo: ConstructionRespo,
    private readonly constructionInfraMapper: ConstructionInfraMapper,
    private readonly decisionInfraMapper: DecisionInfraMapper,
    private readonly submissionInfraMapper: SubmissionInfraMapper,
  ) {}
  // Create
  async initPlan(construction: Construction): Promise<Construction> {
    const infra = this.constructionInfraMapper.toInfra(construction);
    const created = await this.constructionRespo.create(infra);
    const result = this.constructionInfraMapper.toDomain(created);
    return result;
  }

  // FindAll
  async findAll(): Promise<Construction[]> {
    const list = await this.constructionRespo.find();
    const result = list.map((infra) =>
      this.constructionInfraMapper.toDomain(infra),
    );
    return result;
  }

  // if decision string (id) => add submission to an existed
  // if decision is instance of Construction => add to a new
  async addSubmission(
    constructionId: string,
    sub: Submission,
    decision: string | Decision,
  ): Promise<Construction> {
    const subInfra = this.submissionInfraMapper.toInfra(sub);

    let updated: InfraConstructionImp;
    if (typeof decision === 'string')
      updated = await this.constructionRespo.addSubmissionForExistedDec(
        subInfra,
        constructionId,
        decision,
      );
    else {
      const decInfra = this.decisionInfraMapper.toInfra(decision);
      updated = await this.constructionRespo.addSubmissionForNewDec(
        subInfra,
        constructionId,
        decInfra,
      );
    }
    const result = this.constructionInfraMapper.toDomain(updated);
    return result;
  }

  // FindById
  async findById(constructionId: string): Promise<Construction> {
    const finded = await this.constructionRespo.findById(constructionId);
    if (!finded) {
      throw new Error('Not found construction with id: ' + constructionId);
    }
    const result = this.constructionInfraMapper.toDomain(finded);
    return result;
  }

  async approve(
    constructionId: string,
    decisionId: string,
    submissionId: string,
  ): Promise<Construction> {
    const construction = await this.constructionRespo.findOne({
      id: constructionId,
    });
    if (!construction) {
      throw new Error('Construction not found');
    }

    const decision = construction.decisions.find(
      (dec) => dec.id === decisionId,
    );
    if (!decision)
      throw new Error('Decision not found for decisionId ' + decisionId);
    if (decision.isApproved) {
      throw new Error(
        `Decision was approved, not accept re-approve, (decisionId: ${decisionId})`,
      );
    }

    const approvedSubmission = decision.submissions.find(
      (sub) => sub.id === submissionId,
    );

    if (!approvedSubmission) {
      throw new Error(`Submission not found for submissionId ${submissionId}`);
    }
    if (approvedSubmission.constructionInfor) {
      decision.isChangeConstructionInfor = true;
      construction.constructionInfor = approvedSubmission.constructionInfor;
    }

    approvedSubmission.isApproved = true;
    decision.isApproved = true;

    const updated = await this.constructionRespo.updateById(
      constructionId,
      construction,
    );
    const result = this.constructionInfraMapper.toDomain(updated);
    return result;
  }
  /*
  update(id: number, construction: Construction) {
    return `This action updates a #${id} construction`;
  }

  remove(id: number) {
    return `This action removes a #${id} construction`;
  }
*/
}
