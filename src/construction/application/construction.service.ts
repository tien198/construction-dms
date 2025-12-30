import { Injectable } from '@nestjs/common';
import { Construction } from 'src/construction/domain/type/construction.type';
import { ConstructionRespo } from '../infrastructure/construction.respo';
import { Submission } from '../domain/type/submission.type';
import { Decision } from '../domain/type/decision.type';

@Injectable()
export class ConstructionService {
  constructor(private readonly constructionRespo: ConstructionRespo) {}
  // Create
  async initPlan(construction: Construction): Promise<Construction> {
    const created = await this.constructionRespo.create(construction);
    return created;
  }

  // FindAll
  async findAll(): Promise<Construction[]> {
    const list = await this.constructionRespo.find();
    return list;
  }

  // if decision string (id) => add submission to an existed
  // if decision is instance of Construction => add to a new
  async addSubmission(
    constructionId: string,
    sub: Submission,
    decision: string | Decision,
  ): Promise<Construction> {
    let updated: Construction;
    if (typeof decision === 'string')
      updated = await this.constructionRespo.addSubmissionForExistedDec(
        sub,
        constructionId,
        decision,
      );
    else {
      updated = await this.constructionRespo.addSubmissionForNewDec(
        sub,
        constructionId,
        decision,
      );
    }
    return updated;
  }

  // FindById
  async findById(constructionId: string): Promise<Construction> {
    const finded = await this.constructionRespo.findById(constructionId);
    if (!finded) {
      throw new Error('Not found construction with id: ' + constructionId);
    }
    return finded;
  }

  // find decision
  async findDecision(
    constructionId: string,
    decisionId: string,
  ): Promise<Decision | undefined> {
    const decision = await this.constructionRespo.findDecision(
      constructionId,
      decisionId,
    );
    return decision;
  }

  async approve(
    constructionId: string,
    decisionId: string,
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

    const approvedSubmission =
      decision.submissions[decision.submissions.length - 1];

    if (!approvedSubmission) {
      throw new Error(`Submission does not exist`);
    }
    if (approvedSubmission.constructionInfor) {
      decision.isChangeConstructionInfor = true;
      construction.constructionInfor = approvedSubmission.constructionInfor;
    }
    approvedSubmission.isApproved = true;
    decision.date = approvedSubmission.date;
    decision.isApproved = true;

    const updated = await this.constructionRespo.updateById(
      constructionId,
      construction,
    );
    return updated;
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
