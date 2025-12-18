// import { CreateBidPackageDto } from '../dto/bidPackage.dto';
// import { Construction } from '../type/construction.type';

// type DateObject = {
//   dd: string;
//   mm: string;
//   yyyy: string;
// };

// // TRANSITION - entity is created in Controller foreach request
// export class ConstructionDocument {
//   id?: string;
//   documentNo: string;
//   name: string;
//   // dateOfSigning
//   dos: DateObject;
//   budget: string;
//   stringBudget: string;
//   sourceOfFunds: string;
//   // constructionImplementationTime
//   constructionImplementationTime: string;
//   // existingConditionOfTheStructure
//   existingConditionOfTheStructure: string;
//   repairScope: string;
//   decision: {
//     number: string;
//     date: string;
//   };
//   packages: CreateBidPackageDto[];
//   packagesAmount: string;

//   constructor(con: Construction) {
//     this.id = con.id;

//     this.documentNo = con.documentNo;
//     this.name = con.name;

//     // dateOfSigning
//     this.dos = this.toDateObject(con.dateOfSigning);

//     this.budget = this.formatCurrency(con.budget);
//     this.stringBudget = con.stringBudget;

//     this.sourceOfFunds = con.sourceOfFunds;

//     this.constructionImplementationTime =
//       this.formatDate(con.constructionImplementationTime.startDate, 'month') +
//       ' - ' +
//       this.formatDate(con.constructionImplementationTime.endDate, 'month');

//     this.existingConditionOfTheStructure = con.existingConditionOfTheStructure;
//     this.repairScope = con.repairScope;

//     this.decision = {
//       number: con.decision?.number,
//       date: this.formatDate(con.decision.date),
//     };

//     this.packages = con.packages.map((pkg, i) => ({
//       ...pkg,
//       price: this.formatCurrency(pkg.price),
//       contractorSelectionTime: this.formatDate(
//         pkg.contractorSelectionTime,
//         'month',
//       ),
//       isLast: i === con.packages.length - 1,
//     }));
//     this.packagesAmount = this.formatCurrency(con.packagesAmount);
//   }

//   toDateObject = (ISOString: string | Date): DateObject => {
//     const date = new Date(ISOString);
//     const dd = String(date.getDate()).padStart(2, '0');
//     const mm = String(date.getMonth() + 1).padStart(2, '0');
//     const yyyy = String(date.getFullYear());
//     return { dd, mm, yyyy };
//   };

//   formatDate = (
//     ISOString: string | Date | null,
//     formatTo?: 'month' | 'year',
//   ) => {
//     const decisionDate = new Date(ISOString ?? '');
//     const dd = String(decisionDate.getDate()).padStart(2, '0');
//     const mm = String(decisionDate.getMonth() + 1).padStart(2, '0');
//     const yyyy = decisionDate.getFullYear();
//     if (!formatTo) {
//       return dd + '/' + mm + '/' + yyyy;
//     } else if (formatTo === 'month') {
//       return 'Tháng ' + mm + '/' + yyyy;
//     } else {
//       return 'Năm ' + String(yyyy);
//     }
//   };

//   formatCurrency = (amount: number) => {
//     return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
//   };
// }
