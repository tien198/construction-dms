import {
  AdministrativeDocument,
  NestedAdministrativeDocument,
} from 'src/construction/domain/type/administrative-document.type';

export class AdministrativeDocumentImp implements AdministrativeDocument {
  id: string;
  no: string;
  level: string;
  date: Date;
  pursuantToDec_TCT: NestedAdministrativeDocument;
  pursuantToDec_TTMN?: NestedAdministrativeDocument;

  constructor(doc?: AdministrativeDocument) {
    if (doc) {
      for (const k in doc) {
        if (Object.hasOwn(this, k)) {
          this[k] = doc[k as keyof AdministrativeDocument];
        }
      }
    }
  }
}
