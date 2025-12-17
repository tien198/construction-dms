import { BidPackage } from './bidPackage.type';
import { ConstructionPeriod } from './construction.type';

export interface ConstructionInfor {
  name: string;
  existingConditionOfTheStructure: string;
  repairScope: string;

  packages: BidPackage[];
  packagesAmount: number;
  period: ConstructionPeriod;
}
