import { Injectable } from '@nestjs/common';
import { Construction } from 'src/construction/domain/type/construction.type';
import { ConstructionRespo } from '../infrastructure/construction.respo';
import { Submission } from '../domain/type/submission.type';
import { DecisionImp } from '../infrastructure/entities/decision.entity';

@Injectable()
export class ConstructionService {
  constructor(private readonly constructionRespo: ConstructionRespo) {}
  // Create
  async initPlan(construction: Construction) {
    return await this.constructionRespo.create(construction);
  }

  private async addSubmissionExec(
    sub: Submission,
    constructionId: string,
    decisionId?: string,
  ) {
    // finding decion in construction that directly decide for input submission
    const con = await this.findById(constructionId);

    switch (!!decisionId) {
      case true: {
        const dec = con.decisions.find((dec) => dec.id === decisionId);
        if (!dec) {
          throw new Error(
            `Not found decison (with id: ${decisionId}) in construction with id: ${constructionId}`,
          );
        }
        dec.submissions.push(sub);
        break;
      }
      default: {
        const dec_TTMN = sub.pursuantToDec_TTMN!;
        const newDec = new DecisionImp({
          no: dec_TTMN.no,
          level: dec_TTMN.level,
          date: dec_TTMN.date,
          period: sub.period,
          pursuantToDec_TCT: sub.pursuantToDec_TCT,
          pursuantToDec_TTMN: sub.pursuantToDec_TTMN,
          submissions: [sub],
        });
        con.decisions.push(newDec);
        break;
      }
    }

    const updated = await this.constructionRespo.updateById(
      constructionId,
      con,
    );
    return updated;
  }

  // FindAll
  async findAll() {
    const list = await this.constructionRespo.find();
    return list;
  }

  async addSubmission(
    sub: Submission,
    constructionId: string,
    decisionId: string,
  ) {
    const updated = await this.addSubmissionExec(
      sub,
      constructionId,
      decisionId,
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

  async approve(constructionId: string, decisionId: string) {
    const construction = await this.constructionRespo.findOne({
      id: constructionId,
    });
    if (!construction) throw new Error('Construction not found');
    const decision = construction.decisions.find(
      (dec) => dec.id === decisionId,
    );
    if (!decision)
      throw new Error('Decision not found for decisionId ' + decisionId);
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
