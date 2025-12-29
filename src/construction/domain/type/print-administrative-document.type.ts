import {
  AdministrativeDocument,
  NestedAdministrativeDocument,
} from './administrative-document.type';

export interface PrintDocument extends Omit<AdministrativeDocument, 'date'> {
  id: string;
  no: string;
  level: string;
  date: string;
  pursuantToDec_TCT: NestedAdministrativeDocument;
  pursuantToDec_TTMN?: NestedAdministrativeDocument;
}
