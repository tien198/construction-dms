import { BidPackage } from './bidPackage.type';
import { ConstructionDocument } from './document.type';

export interface Construction {
  id?: string;
  name: string;
  existingConditionOfTheStructure: string;
  repairScope: string;
  decision: {
    number: string;
    date: Date;
  };
  packages: BidPackage[];
  packagesAmount: number;
  period: ConstructionPeriod;
  documents: ConstructionDocument[];
}

export type ConstructionPeriod = 'TV' | 'TT' | 'BCKTKT';
