import { Construction } from 'src/construction/domain/construction/construction.entity';
import { Queryable } from 'src/shared/type-ultility/i-queryable';

export interface IConstructionWriteRepository {
  saveConstruction(
    con: Construction,
    client?: Queryable,
  ): Promise<Construction>;
}
