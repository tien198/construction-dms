import { Injectable } from '@nestjs/common';
import { Construction } from 'src/construction/domain/type/construction.type';
import { ConstructionRespo } from '../infrastructure/construction.respo';
import { Submission } from '../domain/type/submission.type';
import { Decision } from '../domain/type/decision.type';

@Injectable()
export class ConstructionService {
  constructor(private readonly constructionRespo: ConstructionRespo) {}
  // Create
  async initPlan(construction: Construction) {
    return await this.constructionRespo.create(construction);
  }

  // FindAll
  async findAll() {
    const list = await this.constructionRespo.find();
    return list;
  }

  // if decision string (id) => add submission to an existed
  // if decision is instance of Construction => add to a new
  async addSubmission(
    constructionId: string,
    sub: Submission,
    decision: string | Decision,
  ) {
    let updated: Construction;
    if (typeof decision === 'string')
      updated = await this.constructionRespo.addSubmissionForExistedDec(
        sub,
        constructionId,
        decision,
      );
    else
      updated = await this.constructionRespo.addSubmissionForNewDec(
        sub,
        constructionId,
        decision,
      );
    return updated;
  }

  // FindById
  async findById(constructionId: string): Promise<Construction> {
    const con = await this.constructionRespo.findById(constructionId);
    if (!con) {
      throw new Error('Not found construction with id: ' + constructionId);
    }
    return con;
  }

  async approve(
    constructionId: string,
    decisionId: string,
    submissionId: string,
  ) {
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
      decision.constructionInfor = approvedSubmission.constructionInfor;
      decision.isChangeConstructionInfor = true;
    }

    approvedSubmission.isApproved = true;
    construction.constructionInfor = decision.constructionInfor;
    decision.isApproved = true;

    return await this.constructionRespo.updateById(
      constructionId,
      construction,
    );
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
