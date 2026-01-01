import { Injectable } from '@nestjs/common';
import { Construction } from 'src/construction/domain/type/construction.type';
import { InfraConstructionImp } from '../entities/construction.infra.entity';
import { DecisionInfraMapper } from './decision.infra.mapper';
import { ConstructionViewModel } from 'src/construction/domain/viewModel/construction.view-model';

@Injectable()
export class ConstructionInfraMapper {
  constructor(private readonly decisionMapper: DecisionInfraMapper) {}
  toDomain(infra: InfraConstructionImp): ConstructionViewModel {
    return new ConstructionViewModel({
      ...infra,
      id: infra.id ?? '',
      decisions: infra.decisions.map((dec) =>
        this.decisionMapper.toDomain(dec),
      ),
      constructionInfor: infra.constructionInfor,
    });
  }

  initInfra(domain: Construction): InfraConstructionImp {
    const infra = new InfraConstructionImp({
      ...domain,
      decisions: domain.decisions.map((dec) =>
        this.decisionMapper.initInfra(dec),
      ),
      constructionInfor: domain.constructionInfor,
    });
    return infra;
  }
}
