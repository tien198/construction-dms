import { Construction } from '../type/construction.type';

type DateObject = {
  dd: string;
  mm: string;
  yyyy: string;
};

// TRANSITION - entity is created in Controller foreach request
export class ConstructionDocument {
  id?: string;
  documentNo: string;
  name: string;
  // dateOfSigning
  dos: DateObject;
  budget: string;
  stringBudget: string;
  // constructionExecutionTime
  cet: {
    startDate: DateObject;
    endDate: DateObject;
  };
  // existingConditionOfTheStructure
  existingConditionOfTheStructure: string;
  repairScope: string;
  decision: {
    number: string;
    date: string;
  };

  constructor(con: Construction) {
    this.id = con.id;

    this.documentNo = con.documentNo;
    this.name = con.name;

    // dateOfSigning
    this.dos = this.toDateObject(con.dateOfSigning);

    this.budget = this.formatCurrency(con.budget);
    this.stringBudget = con.stringBudget;

    // constructionExecutionTime
    this.cet = {
      startDate: this.toDateObject(con.constructionExecutionTime.startDate),
      endDate: this.toDateObject(con.constructionExecutionTime.endDate),
    };

    this.existingConditionOfTheStructure = con.existingConditionOfTheStructure;
    this.repairScope = con.repairScope;

    this.decision = {
      number: con.decision?.number,
      date: this.formatDate(con.decision.date),
    };
  }

  toDateObject = (ISOString: string | Date): DateObject => {
    const date = new Date(ISOString);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = String(date.getFullYear());
    return { dd, mm, yyyy };
  };

  formatDate = (ISOString: string | Date) => {
    const decisionDate = new Date(ISOString);
    const dd = String(decisionDate.getDate()).padStart(2, '0');
    const mm = String(decisionDate.getMonth() + 1).padStart(2, '0');
    const yyyy = decisionDate.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
  };

  formatCurrency = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
}
