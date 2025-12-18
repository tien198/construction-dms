import { DB } from 'src/common/respo/db';
import { Construction } from 'src/common/type/construction.type';

export class ConstructionRespo {
  constructor(
    private readonly db: DB,
    private readonly construction: Construction,
  ) {}

  async create() {
    return await this.db.insertOne(this.construction);
  }

  async updateById() {
    const con = this.construction;
    if (!con.id) throw new Error('updated is missing "id" field');
    return await this.db.updateOne<Construction>({ id: con.id }, con);
  }
}
