import { AdministrativeDocument } from './administrative-document.type';
import { PrintConstructionInfor } from './print-cnstruction-infor.type';

export interface PrintDocument
  extends Omit<
      AdministrativeDocument,
      'date' | 'pursuantToDec_TCT' | 'pursuantToDec_TTMN'
    >,
    PrintConstructionInfor {
  date: string;
  pursuantToDec_TCT: PrintNestedAdministrativeDocument;
  pursuantToDec_TTMN?: PrintNestedAdministrativeDocument;
}

export type PrintNestedAdministrativeDocument = Pick<
  PrintDocument,
  'id' | 'no' | 'level' | 'date'
>;
