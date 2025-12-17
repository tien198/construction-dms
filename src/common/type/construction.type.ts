import { ConstructionInfor } from './constructionInfor.type';
import { Decision } from './decision.type';

export interface Construction {
  id?: string;
  pursuantToDec_TCT: string;
  decisions: Decision[];
  constructionInfor: ConstructionInfor;
}

export type ConstructionPeriod = 'TV' | 'TT' | 'BCKTKT';
