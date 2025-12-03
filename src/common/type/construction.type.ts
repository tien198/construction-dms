type BidPackage = {
  projectOwner: string;
  name: string;
  shortDescription: string;
  price: number;
  contractorSelectionTime: Date;
  implementPeriod: string; // 10 ngày
  sourceOfFunds: string;
  contractType: string;
};

export interface Construction {
  id?: string;
  documentNo: string;
  name: string;
  dateOfSigning: Date;
  budget: number;
  stringBudget: string;
  //
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
  proposal: BidPackage[];
}
