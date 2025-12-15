import { ConstructionPeriod } from './construction.type';

export interface ConstructionDocument {
  documentNo: string;
  period: ConstructionPeriod;
  type: DocType;

  date: Date;
  budget: number;
  stringBudget: string;
  sourceOfFunds: string;
  //
  constructionImplementationTime: {
    startDate: Date;
    endDate: Date;
  };
  decision: {
    number: string;
    date: Date;
  };
}

export type DocType = 'TTr' | 'QD';
