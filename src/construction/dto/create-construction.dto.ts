import { Construction } from '../type/construction.type';

export class CreateConstructionDto implements Construction {
  number: number;
  name: string;
  dateOfSigning: Date;
  budget: number;
  stringBudget: string;
  constructionExecutionTime: {
    startDate: Date;
    endDate: Date;
  };
  existingConditionOfTheStructure: string;
  repairScope: string;
  decision: {
    decisionNumber: string;
    decisionDate: Date;
  };
}
