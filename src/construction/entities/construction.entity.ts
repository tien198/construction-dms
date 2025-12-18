import { Construction } from '../type/construction.type';
import { ConstructionInfor } from '../type/construction-infor.type';
import { Decision } from '../type/decision.type';
import { NestedAdministrativeDocument } from '../type/administrative-document. type';

export class ConstructionImp implements Construction {
  id?: string;
  pursuantToDec_TCT: NestedAdministrativeDocument;
  decisions: Decision[] = [];
  constructionInfor: ConstructionInfor;

  constructor(con?: Partial<Construction>) {
    if (con) Object.assign(this, con);
  }
}
