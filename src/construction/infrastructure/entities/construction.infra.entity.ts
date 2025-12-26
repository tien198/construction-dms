import { Construction } from '../../domain/type/construction.type';
import { ConstructionInfor } from '../../domain/type/construction-infor.type';
import { NestedAdministrativeDocument } from '../../domain/type/administrative-document.type';
import { InfraDecisionImp } from './decision.infra.entity';

export class InfraConstructionImp implements Omit<Construction, 'decisions'> {
  id?: string;
  pursuantToDec_TCT: NestedAdministrativeDocument;
  decisions: InfraDecisionImp[] = [];
  constructionInfor: ConstructionInfor;

  constructor(con?: InfraConstructionImp) {
    if (con) {
      Object.assign(this, con);
      if (!con.id) {
        this.id = Date.now() + '-' + crypto.randomUUID();
      }
    } else {
      this.id = Date.now() + '-' + crypto.randomUUID();
    }
  }
}
