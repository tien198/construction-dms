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

  async create(construction: Construction): Promise<Construction> {
    const infra = this.constructionInfraMapper.toInfra(construction);
    const created = await this.col.insertOne(infra);
    const result = this.constructionInfraMapper.toDomain(created);

    return result;
  }

  async updateById(
    id: string,
    construction: InfraConstructionImp,
  ): Promise<Construction> {
    if (!id) {
      throw new Error('updated is missing "id" field');
    }
    const updatedInfra = await this.col.updateOne({ id }, construction);
    const conDomain = this.constructionInfraMapper.toDomain(updatedInfra);
    return conDomain;
  }

  async find(filter?: Partial<InfraConstructionImp>): Promise<Construction[]> {
    const list = await this.col.find(filter);
    const result = list.map((infra) =>
      this.constructionInfraMapper.toDomain(infra),
    );
    return result;
  }

  findOne(
    filter: Partial<InfraConstructionImp>,
  ): Promise<InfraConstructionImp | undefined> {
    return this.col.findOne(filter);
  }

  async findById(id: string): Promise<Construction | undefined> {
    const finded = await this.col.findOne({ id });
    if (!finded) {
      return undefined;
    }
    const result = this.constructionInfraMapper.toDomain(finded);
    return result;
  }

  async findDecision(
    constructionId: string,
    decisionId: string,
  ): Promise<Decision | undefined> {
    const construction = await this.findById(constructionId);
    if (!construction) {
      throw new Error('Construction not found');
    }

    const decision = construction.decisions.find(
      (dec) => dec.id === decisionId,
    );
    if (!decision) {
      return undefined;
    }

    if (!decision.submission.constructionInfor) {
      decision.submission.constructionInfor = construction.constructionInfor;
    }

    return decision;
  }

  async addSubmissionForNewDec(
    sub: Submission,
    conId: string,
    dec: Decision,
  ): Promise<Construction> {
    const con = await this.col.findOne({ id: conId });
    if (!con) {
      throw new Error('Not found construction with id: ' + conId);
    }
    const decInfra = this.decisionInfraMapper.toInfra(dec);
    const subInfra = this.submissionInfraMapper.toInfra(sub);

    /*
      construction -> decison -> submision
      */
    const subAldeady = decInfra.submissions.find((s) => s.id === sub.id);
    if (!subAldeady) {
      decInfra.submissions.push(subInfra);
    }
    decInfra.date = sub.date;
    con.decisions.push(decInfra);

    const updatedInfra = await this.col.updateOne({ id: conId }, con);
    const conDomain = this.constructionInfraMapper.toDomain(updatedInfra);
    return conDomain;
  }

  async addSubmissionForExistedDec(
    sub: Submission,
    conId: string,
    decId: string,
  ): Promise<Construction> {
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
}
