import { BidPackage } from '../../domain/type/bidPackage.type';
import { ConstructionInfor } from '../../domain/type/construction-infor.type';
import { ConstructionPeriod } from '../../domain/type/construction.type';

export class ConstructionInforImp implements ConstructionInfor {
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
