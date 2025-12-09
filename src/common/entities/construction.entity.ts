import { BidPackage } from '../type/bidPackage.type';
import { Construction } from '../type/construction.type';

export class ConstructionImp implements Construction {
  id?: string;
  documentNo: string;
  name: string;
  dateOfSigning: Date;
  budget: number;
  stringBudget: string;
  sourceOfFunds: string;
  constructionImplementationTime: {
    startDate: Date;
    endDate: Date;
  };
  existingConditionOfTheStructure: string;
  repairScope: string;
  decision: {
    number: string;
    date: Date;
  };
  packages: BidPackage[];
}
