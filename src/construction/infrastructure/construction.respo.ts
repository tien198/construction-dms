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

  create(construction: Construction): Promise<Construction> {
    return this.col.insertOne(construction);
  }

  updateById(id: string, construction: Construction): Promise<Construction> {
    if (!id) throw new Error('updated is missing "id" field');
    return this.col.updateOne({ id }, construction);
  }

  async find(filter?: Partial<Construction>) {
    return await this.col.find(filter);
  }

  findOne(filter: Partial<Construction>): Promise<Construction | null> {
    return this.col.findOne(filter);
  }

  findById(id: string): Promise<Construction | null> {
    return this.col.findOne({ id });
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
    /*
      construction -> decison -> submision
      */
    const subAldeady = dec.submissions.find((s) => s.id === sub.id);
    if (!subAldeady) {
      dec.submissions.push(sub);
    }
    con.decisions.push(dec);

    return await this.updateById(conId, con);
  }

  async addSubmissionForExistedDec(
    sub: Submission,
    conId: string,
    decId: string,
  ): Promise<Construction> {
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
