import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Collection } from 'src/common/infrastructure/collection';
import { DB } from 'src/common/infrastructure/db';

import { Construction } from 'src/construction/domain/type/construction.type';

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
    return await this.col.insertOne(construction);
  }

  async updateById(construction: Construction) {
    if (!construction.id) throw new Error('updated is missing "id" field');
    return await this.col.updateOne({ id: construction.id }, construction);
  }

  async find(filter?: Construction) {
    return await this.col.find(filter);
  }
}
