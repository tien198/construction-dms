import type { Decision } from './create-decision.type';

export interface Construction {
  id: string;
  decisions: Decision[];
}

export type ConstructionPeriod = 'TV' | 'TT' | 'TC' | 'BCKTKT';
