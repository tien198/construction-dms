import { ConstructionInfor } from 'src/construction/domain/type/construction-infor.type';
import { BidPackageDto } from './bidPackage.dto';
import { ConstructionPeriod } from 'src/construction/domain/type/construction.type';

export class ConstructionInforDto
  implements
    Omit<ConstructionInfor, 'constructionImplementationTime' | 'bidPackages'>
{
  name: string;
  cost: number;
  costString: string;
  sourceOfFunds: string;
  constructionImplementationTime: {
    startDate: string;
    endDate: string;
  };
  existingConditionOfTheStructure: string;
  repairScope: string;

  bidPackages: BidPackageDto[] = [];
  estimatedCost: number;
  estimatedCostString: string;
  period: ConstructionPeriod;
}
