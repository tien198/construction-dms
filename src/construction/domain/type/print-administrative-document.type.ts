import { AdministrativeDocument } from './administrative-document.type';
import { PrintConstructionInfor } from './print-cnstruction-infor.type';

export type DateObject = {
  dd: string;
  mm: string;
  yyyy: string;
};

export interface PrintDocument
  extends Omit<AdministrativeDocument, 'date'>,
    PrintConstructionInfor {
  date: DateObject;
}
