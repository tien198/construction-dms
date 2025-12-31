import { NestedAdministrativeDocument } from '../type/administrative-document.type';
import { ConstructionInfor } from '../type/construction-infor.type';
import { Construction } from '../type/construction.type';
import { Decision } from '../type/decision.type';

export class ConstructionImp implements Construction {
  id?: string;
  pursuantToDec_TCT: NestedAdministrativeDocument;
  decisions: Decision[];
  constructionInfor: ConstructionInfor;

  constructor(con?: Construction) {
    if (con) {
      for (const k in con) {
        if (Object.hasOwn(this, k)) {
          this[k] = con[k as keyof Construction];
        }
      }
    }
  }
}
