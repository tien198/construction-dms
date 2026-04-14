import { ConstructionResDto } from '../../../dto/response/get-constructions.res-dto';

export interface IConstructionRepository {
  findConstructionsList: () => Promise<ConstructionResDto[]>;
}
