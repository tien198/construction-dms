import { AdministrativeDocument } from './administrative-document.type';
import { PrintConstructionInfor } from './print-cnstruction-infor.type';

export interface PrintDocument
  extends Omit<AdministrativeDocument, 'date'>,
    PrintConstructionInfor {
  date: string;
}
