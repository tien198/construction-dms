import { ConstructionResDto } from '../../../dto/response/get-constructions-list.res-dto';

export interface IConstructionRepository {
  findConstructionsList: () => Promise<ConstructionResDto[]>;
}
