import { BidPackage } from './bidPackage.type';
import { ConstructionPeriod } from './construction.type';

export interface ConstructionInfor {
  name: string;
  cost: number;
  costString: string;
  sourceOfFunds: string;
  constructionImplementationTime: {
    startDate: Date;
    endDate: Date;
  };
  existingConditionOfTheStructure: string;
  repairScope: string;

  bidPackages: BidPackage[];
  packagesAmount: number;
  period: ConstructionPeriod;
}
