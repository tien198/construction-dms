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

  constructor(doc?: Partial<AdministrativeDocument>) {
    if (doc) {
      Object.assign(this, doc);
      if (!doc.id) {
        this.id = Date.now() + '-' + crypto.randomUUID();
      }
    } else {
      this.id = Date.now() + '-' + crypto.randomUUID();
    }
  }
}
