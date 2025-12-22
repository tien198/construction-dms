import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Collection } from 'src/common/infrastructure/collection';
import { DB } from 'src/common/infrastructure/db';

import { Construction } from 'src/construction/domain/type/construction.type';
import { Submission } from '../domain/type/submission.type';
import { Decision } from '../domain/type/decision.type';

@Injectable()
export class ConstructionRespo {
  constructor(
    private readonly db: DB,
    private readonly configService: ConfigService,
  ) {
    const dataFile =
      this.configService.get<string>('CONSTRUCTIONS_DATA_FILE') ?? '';
    this.col = this.db.collection<Construction>(dataFile);
  }

  col: Collection<Construction>;

  async create(construction: Construction) {
    construction.id =
      construction.decisions[0].date.getTime() + '-' + crypto.randomUUID();
    construction.decisions[0].id =
      construction.decisions[0].date.getTime() + '-' + crypto.randomUUID();
    return await this.col.insertOne(construction);
  }

  async updateById(id: string, construction: Construction) {
    if (!id) throw new Error('updated is missing "id" field');
    return await this.col.updateOne({ id }, construction);
  }

  async find(filter?: Partial<Construction>) {
    return await this.col.find(filter);
  }

  async findOne(filter: Partial<Construction>) {
    return await this.col.findOne(filter);
  }

  async findById(id: string) {
    return await this.col.findOne({ id });
  }

  async addSubmissionForNewDec(sub: Submission, conId: string, dec: Decision) {
    const con = await this.col.findOne({ id: conId });
    if (!con) {
      throw new Error('Not found construction with id: ' + conId);
    }
    /*
      construction -> decison -> submision
      */
    dec.submissions.push(sub);
    con.decisions.push(dec);

    return await this.updateById(conId, con);
  }

  async addSubmissionForExistedDec(
    sub: Submission,
    conId: string,
    decId: string,
  ) {
    const con = await this.col.findOne({ id: conId });
    if (!con) {
      throw new Error('Not found construction with id: ' + conId);
    }
    const dec = con.decisions.find((d) => d.id === decId);
    if (!dec)
      throw new Error(
        `Not found decission (with id: ${decId}) in consruction (wich id: ${conId} )`,
      );
    dec.submissions.push(sub);

    return await this.updateById(conId, con);
  }
}
