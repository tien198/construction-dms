import { Injectable } from '@nestjs/common';
import { DB } from 'src/common/respo/db';
import { Construction } from 'src/construction/type/construction.type';

@Injectable()
export class ConstructionRespo {
  constructor(private readonly db: DB) {}

  async create(construction: Construction) {
    return await this.db.insertOne(construction);
  }

  async updateById(construction: Construction) {
    if (!construction.id) throw new Error('updated is missing "id" field');
    return await this.db.updateOne<Construction>(
      { id: construction.id },
      construction,
    );
  }
}
