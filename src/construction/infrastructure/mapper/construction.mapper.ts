import { Injectable } from '@nestjs/common';
import { Construction } from 'src/construction/domain/type/construction.type';
import { InfraConstructionImp } from '../entities/construction.infra.entity';
import { DecisionInfraMapper } from './decision.infra.mapper';

@Injectable()
export class ConstructionInfraMapper {
  constructor(private readonly decisionMapper: DecisionInfraMapper) {}
  toDomain(infra: InfraConstructionImp): Construction {
    return {
      ...infra,
      decisions: infra.decisions.map((dec) =>
        this.decisionMapper.toDomain(dec),
      ),
      constructionInfor: infra.constructionInfor,
    };
  }

  toInfra(domain: Construction): InfraConstructionImp {
    const infra = new InfraConstructionImp({
      ...domain,
      decisions: domain.decisions.map((dec) =>
        this.decisionMapper.toInfra(dec),
      ),
      constructionInfor: domain.constructionInfor,
    });
    return infra;
  }
}
