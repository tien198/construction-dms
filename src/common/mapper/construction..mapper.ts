import { CreateConstructionDto } from '../dto/create-construction.dto';
import { ConstructionImp } from '../entities/construction.entity';

export class ConstructionMapper {
  toEntity(dto: CreateConstructionDto) {
    const entity = new ConstructionImp();
    entity.name = dto.name;
    entity.dateOfSigning = dto.dateOfSigning;
    entity.budget = dto.budget;
    entity.stringBudget = dto.stringBudget;
    entity.constructionExecutionTime = dto.constructionExecutionTime;
  }
}
