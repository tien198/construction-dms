import { ConstructionResDto } from '../../../dto/response/get-constructions.res-dto';
import { ConstructionRow } from 'src/construction/infrastructure/adapter/outbound/persistence/model/construction.row';

export interface IConstructionQueryRepository {
  findConstructionById(id: string): Promise<ConstructionRow | undefined>;

  findConstructionsList(): Promise<ConstructionResDto[]>;
}
