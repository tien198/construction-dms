import { Injectable } from '@nestjs/common';
import { Construction } from 'src/construction/domain/type/construction.type';
import { ConstructionRespo } from '../infrastructure/construction.respo';
import { Submission } from '../domain/type/submission.type';
import { Decision } from '../domain/type/decision.type';
import { DecisionViewModel } from '../domain/viewModel/decison.view-model';
import { ConstructionViewModel } from '../domain/viewModel/construction.view-model';

@Injectable()
export class ConstructionService {
  constructor(private readonly constructionRespo: ConstructionRespo) {}
  // Create
  async initPlan(construction: Construction): Promise<ConstructionViewModel> {
    const created = await this.constructionRespo.create(construction);
    return created;
  }

  // FindAll
  async findAll(): Promise<ConstructionViewModel[]> {
    const list = await this.constructionRespo.find();
    return list;
  }

  // if decision string (id) => add submission to an existed
  // if decision is instance of Construction => add to a new
  async addSubmission(
    constructionId: string,
    sub: Submission,
    decision: string | Decision,
  ): Promise<ConstructionViewModel> {
    let updated: ConstructionViewModel;
    if (typeof decision === 'string')
      updated = await this.constructionRespo.addSubmissionForExistedDec(
        sub,
        constructionId,
        decision,
      );
    else {
      updated = await this.constructionRespo.addSubmissionForNewDec(
        constructionId,
        decision,
      );
    }
    return updated;
  }

  // FindById
  async findById(constructionId: string): Promise<ConstructionViewModel> {
    const finded = await this.constructionRespo.findById(constructionId);
    if (!finded) {
      throw new Error('Not found construction with id: ' + constructionId);
    }
    return finded;
  }

  // find decision
  async findDecision(
    // constructionId: string,
    decisionId: string,
  ): Promise<DecisionViewModel | undefined> {
    const decision = await this.constructionRespo.findDecision(
      // constructionId,
      decisionId,
    );
    return decision;
  }

  async approve(
    constructionId: string,
    decisionId: string,
  ): Promise<ConstructionViewModel> {
    const updated = await this.constructionRespo.approve(
      constructionId,
      decisionId,
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
