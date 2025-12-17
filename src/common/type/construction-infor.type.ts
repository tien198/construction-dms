import { BidPackage } from './bidPackage.type';
import { ConstructionPeriod } from './construction.type';

export interface ConstructionInfor {
  name: string;
  budget: number;
  stringBudget: string;
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
