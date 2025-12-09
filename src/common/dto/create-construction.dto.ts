import { CreateBidPackageDto } from './create-bidPackage.dto';

export class CreateConstructionDto {
  documentNo: string;
  name: string;
  dateOfSigning: string;
  budget: number;
  stringBudget: string;
  sourceOfFunds: string;
  constructionImplementationTime: {
    startDate: string;
    endDate: string;
  };
  existingConditionOfTheStructure: string;
  repairScope: string;
  decision: {
    number: string;
    date: string;
  };
  packages: CreateBidPackageDto[];
}
