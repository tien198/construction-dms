import { BidPackage } from '../type/construction.type';

export class CreateConstructionDto {
  documentNo: string;
  name: string;
  dateOfSigning: string;
  budget: number;
  stringBudget: string;
  constructionExecutionTime: {
    startDate: string;
    endDate: string;
  };
  existingConditionOfTheStructure: string;
  repairScope: string;
  decision: {
    number: string;
    date: string;
  };
  packages: BidPackage[];
}
