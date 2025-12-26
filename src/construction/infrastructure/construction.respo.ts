import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Collection } from 'src/common/infrastructure/collection';
import { DB } from 'src/common/infrastructure/db';
import { InfraConstructionImp } from './entities/construction.infra.entity';
import { InfraSubmissionImp } from './entities/submission.infra.entity';
import { InfraDecisionImp } from './entities/decision.infra.entity';

@Injectable()
export class ConstructionRespo {
  constructor(
    private readonly db: DB,
    private readonly configService: ConfigService,
  ) {
    const dataFile =
      this.configService.get<string>('CONSTRUCTIONS_DATA_FILE') ?? '';
    this.col = this.db.collection<InfraConstructionImp>(dataFile);
  }

  col: Collection<InfraConstructionImp>;

  create(construction: InfraConstructionImp): Promise<InfraConstructionImp> {
    return this.col.insertOne(construction);
  }

  updateById(
    id: string,
    construction: InfraConstructionImp,
  ): Promise<InfraConstructionImp> {
    if (!id) {
      throw new Error('updated is missing "id" field');
    }
    return this.col.updateOne({ id }, construction);
  }

  async find(filter?: Partial<InfraConstructionImp>) {
    return await this.col.find(filter);
  }

  findOne(
    filter: Partial<InfraConstructionImp>,
  ): Promise<InfraConstructionImp | undefined> {
    return this.col.findOne(filter);
  }

  findById(id: string): Promise<InfraConstructionImp | undefined> {
    return this.col.findOne({ id });
  }

  async addSubmissionForNewDec(
    sub: InfraSubmissionImp,
    conId: string,
    dec: InfraDecisionImp,
  ): Promise<InfraConstructionImp> {
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

    return await this.col.updateOne({ id: conId }, con);
  }

  async addSubmissionForExistedDec(
    sub: InfraSubmissionImp,
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

    return await this.col.updateOne({ id: conId }, con);
  }
}
