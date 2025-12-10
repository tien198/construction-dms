import { BidPackage } from './bidPackage.type';

export interface Construction {
  id?: string;
  documentNo: string;
  name: string;
  dateOfSigning: Date;
  budget: number;
  stringBudget: string;
  sourceOfFunds: string;
  //
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
  packagesAmount: number;
}
