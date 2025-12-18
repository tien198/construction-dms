import { NestedAdministrativeDocument } from './administrative-document. type';
import { ConstructionInfor } from './construction-infor.type';
import { Decision } from './decision.type';

export interface Construction {
  id?: string;
  pursuantToDec_TCT: NestedAdministrativeDocument;
  decisions: Decision[];
  constructionInfor: ConstructionInfor;
}

export type ConstructionPeriod = 'KH' | 'LCNT_TV_TT' | 'BCKTKT';
// LCNTT_TV_TT bao gồm 'TV' | 'TT'
