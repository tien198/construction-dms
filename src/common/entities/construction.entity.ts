import { Construction } from '../type/construction.type';
import { ConstructionInfor } from '../type/constructionInfor.type';
import { Decision } from '../type/decision.type';

export class ConstructionImp implements Construction {
  id?: string;
  pursuantToDec_TCT: string;
  decisions: Decision[];
  constructionInfor: ConstructionInfor;
}
