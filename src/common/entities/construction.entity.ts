import { BidPackage, Construction } from '../type/construction.type';

export class ConstructionImp implements Construction {
  id?: string;
  documentNo: string;
  name: string;
  dateOfSigning: Date;
  budget: number;
  stringBudget: string;
  sourceOfFunds: string;
  constructionExecutionTime: {
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
