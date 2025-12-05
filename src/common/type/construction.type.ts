type BidPackage = {
  projectOwner: string;
  name: string;
  shortDescription: string;
  price: number;
  contractorSelectionTime: Date;
  implementDuration: string; // 10 ngày
  contractType: string;
};

export interface Construction {
  id?: string;
  documentNo: string;
  name: string;
  dateOfSigning: Date;
  budget: number;
  stringBudget: string;
  // sourceOfFunds: string;
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
  // packageProposals: BidPackage[];
}
