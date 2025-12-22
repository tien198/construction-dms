import { Construction } from '../../domain/type/construction.type';
import { ConstructionInfor } from '../../domain/type/construction-infor.type';
import { Decision } from '../../domain/type/decision.type';
import { NestedAdministrativeDocument } from '../../domain/type/administrative-document. type';

export class ConstructionImp implements Construction {
  id: string;
  pursuantToDec_TCT: NestedAdministrativeDocument;
  decisions: Decision[] = [];
  constructionInfor: ConstructionInfor;

  constructor(con?: Partial<Construction>) {
    if (con) Object.assign(this, con);
  }
}
