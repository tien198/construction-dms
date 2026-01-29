import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Collection } from 'src/common/infrastructure/collection';
import { DB } from 'src/common/infrastructure/db';
import { InfraConstructionImp } from './entities/construction.infra.entity';
import { ConstructionInfraMapper } from '../infrastructure/mapper/construction.mapper';
import { DecisionInfraMapper } from '../infrastructure/mapper/decision.infra.mapper';
import { SubmissionInfraMapper } from '../infrastructure/mapper/submission.mapper';
import { Construction } from '../domain/type/construction.type';
import { Submission } from '../domain/type/submission.type';
import { Decision } from '../domain/type/decision.type';
import { ConstructionViewModel } from '../domain/viewModel/construction.view-model';
import { DecisionViewModel } from '../domain/viewModel/decison.view-model';
import { Filter } from 'src/common/infrastructure/type/db.type';

@Injectable()
export class ConstructionRespo {
  constructor(
    private readonly db: DB,
    private readonly configService: ConfigService,
    private readonly constructionInfraMapper: ConstructionInfraMapper,
    private readonly decisionInfraMapper: DecisionInfraMapper,
    private readonly submissionInfraMapper: SubmissionInfraMapper,
  ) {
    const dataFile =
      this.configService.get<string>('CONSTRUCTIONS_DATA_FILE') ?? '';
    this.col = this.db.collection<InfraConstructionImp>(dataFile);
  }

  col: Collection<InfraConstructionImp>;

  async create(construction: Construction): Promise<ConstructionViewModel> {
    const infra = this.constructionInfraMapper.initInfra(construction);
    const created = await this.col.insertOne(infra);
    const result = this.constructionInfraMapper.toDomain(created);

    return result;
  }

  async updateById(
    id: string,
    construction: InfraConstructionImp,
  ): Promise<ConstructionViewModel> {
    if (!id) {
      throw new Error('updated is missing "id" field');
    }
    const updatedInfra = await this.col.updateOne({ id }, construction);
    const conDomain = this.constructionInfraMapper.toDomain(updatedInfra);
    return conDomain;
  }

  async find(
    filter?: Filter<InfraConstructionImp>,
  ): Promise<ConstructionViewModel[]> {
    const list = await this.col.find(filter);
    const result = list.map((infra) =>
      this.constructionInfraMapper.toDomain(infra),
    );
    return result;
  }

  async findOne(
    filter: Filter<InfraConstructionImp>,
  ): Promise<ConstructionViewModel | undefined> {
    const con = await this.col.findOne(filter);
    if (!con) {
      throw new Error('Construction not found');
    }
    const result = this.constructionInfraMapper.toDomain(con);
    return result;
  }

  async findById(id: string): Promise<ConstructionViewModel | undefined> {
    const finded = await this.col.findOne({ id });
    if (!finded) {
      return undefined;
    }
    const result = this.constructionInfraMapper.toDomain(finded);
    return result;
  }

  // find decision base on decisionId or { conId + period }
  async findDecision(
    decisionId: string | { conId: string; period: string },
  ): Promise<DecisionViewModel | undefined> {
    let construction: ConstructionViewModel | undefined;
    if (typeof decisionId === 'string') {
      construction = await this.findOne({
        'decisions.id': decisionId,
      });
    } else {
      // `decisionId`  now is constructionId + period
      construction = await this.findById(decisionId.conId);
    }
    if (!construction) {
      return undefined;
    }

    // find decision index whether base on decisionId or period
    const findIndexFilterFnc =
      typeof decisionId === 'string'
        ? (dec: DecisionViewModel) => dec.id === decisionId
        : (dec: DecisionViewModel) =>
            dec.period.toLowerCase() === decisionId.period.toLowerCase();
    const decIdx = construction.decisions.findIndex(findIndexFilterFnc);

    if (decIdx < 0) {
      return undefined;
    }
    const decision = this.resultDecWithConstructionInfor(construction, decIdx);
    return decision;
  }

  resultDecWithConstructionInfor(
    construction: ConstructionViewModel,
    decIdx: number,
  ): DecisionViewModel {
    const decision = construction.decisions[decIdx];

    if (!decision.submission.constructionInfor) {
      const idxArr: number[] = [];
      for (let i = 0; i < construction.decisions.length; i++) {
        if (construction.decisions[i].isChangeConstructionInfor) {
          if (i === decIdx) break;
          idxArr.push(i);
        }
      }
      if (idxArr.length === 0) {
        decision.submission.constructionInfor = construction.constructionInfor;
      } else {
        const lastIdx = idxArr[idxArr.length - 1];
        decision.submission.constructionInfor =
          construction.decisions[lastIdx].submission.constructionInfor;
      }
    }
    return decision;
  }

  async addSubmissionForNewDec(
    conId: string,
    dec: Decision,
  ): Promise<ConstructionViewModel> {
    const con = await this.col.findOne({ id: conId });
    if (!con) {
      throw new Error('Not found construction with id: ' + conId);
    }
    const decInfra = this.decisionInfraMapper.initInfra(dec);

    /*
      construction -> decison -> submision
      */
    decInfra.date = decInfra.submissions[0].date;
    con.decisions.push(decInfra);

    const updatedInfra = await this.col.updateOne({ id: conId }, con);
    const conDomain = this.constructionInfraMapper.toDomain(updatedInfra);
    return conDomain;
  }

  async addSubmissionForExistedDec(
    sub: Submission,
    conId: string,
    decId: string,
  ): Promise<ConstructionViewModel> {
    const subInfra = this.submissionInfraMapper.toInfra(sub);

    const con = await this.col.findOne({ id: conId });
    if (!con) {
      throw new Error('Not found construction with id: ' + conId);
    }
    const dec = con.decisions.find((d) => d.id === decId);

    if (!dec)
      throw new Error(
        `Not found decission (with id: ${decId}) in consruction (wich id: ${conId} )`,
      );
    else if (dec?.isApproved) {
      throw new Error('decission is already approved, can not add submission');
    }
    const subAldeady = dec.submissions.find((s) => s.id === sub.id);
    if (!subAldeady) {
      dec.submissions.push(subInfra);
    }
    dec.date = sub.date;
    const updatedInfra = await this.col.updateOne({ id: conId }, con);
    const conDomain = this.constructionInfraMapper.toDomain(updatedInfra);
    return conDomain;
  }

  async approve(
    constructionId: string,
    decisionId: string,
  ): Promise<ConstructionViewModel> {
    const construction = await this.col.findOne({
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

    const updated = await this.updateById(constructionId, construction);
    return updated;
  }
}
