import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Collection } from 'src/common/infrastructure/collection';
import { DB } from 'src/common/infrastructure/db';

import { Submission } from '../domain/type/submission.type';
import { InfraConstructionImp } from './entities/construction.infra.entity';
import { Construction } from '../domain/type/construction.type';
import { ConstructionInfraMapper } from './mapper/construction.mapper';
import { Decision } from '../domain/type/decision.type';
import { DecisionInfraMapper } from './mapper/decision.infra.mapper';

@Injectable()
export class ConstructionRespo {
  constructor(
    private readonly db: DB,
    private readonly configService: ConfigService,
    private readonly constructionInfraMapper: ConstructionInfraMapper,
    private readonly decisionInfraMapper: DecisionInfraMapper,
  ) {
    const dataFile =
      this.configService.get<string>('CONSTRUCTIONS_DATA_FILE') ?? '';
    this.col = this.db.collection<InfraConstructionImp>(dataFile);
  }

  col: Collection<InfraConstructionImp>;

  create(construction: Construction): Promise<InfraConstructionImp> {
    const constructionInfra =
      this.constructionInfraMapper.toInfra(construction);
    return this.col.insertOne(constructionInfra);
  }

  updateById(
    id: string,
    construction: Construction,
  ): Promise<InfraConstructionImp> {
    if (!id) {
      throw new Error('updated is missing "id" field');
    }
    const constructionInfra =
      this.constructionInfraMapper.toInfra(construction);
    return this.col.updateOne({ id }, constructionInfra);
  }

  async find(filter?: Partial<InfraConstructionImp>) {
    return await this.col.find(filter);
  }

  findOne(
    filter: Partial<InfraConstructionImp>,
  ): Promise<InfraConstructionImp | null> {
    return this.col.findOne(filter);
  }

  findById(id: string): Promise<InfraConstructionImp | null> {
    return this.col.findOne({ id });
  }

  async addSubmissionForNewDec(
    sub: Submission,
    conId: string,
    dec: Decision,
  ): Promise<InfraConstructionImp> {
    const con = await this.col.findOne({ id: conId });
    if (!con) {
      throw new Error('Not found construction with id: ' + conId);
    }
    /*
      construction -> decison -> submision
      */
    const decInfra = this.decisionInfraMapper.toInfra(dec);
    const subAldeady = decInfra.submissions.find((s) => s.id === sub.id);
    if (!subAldeady) {
      decInfra.submissions.push(sub);
    }
    con.decisions.push(decInfra);

    return await this.updateById(conId, con);
  }

  async addSubmissionForExistedDec(
    sub: Submission,
    conId: string,
    decId: string,
  ): Promise<InfraConstructionImp> {
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
      dec.submissions.push(sub);
    }

    return await this.updateById(conId, con);
  }
}
