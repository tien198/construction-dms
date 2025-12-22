import {
  AdministrativeDocument,
  NestedAdministrativeDocument,
} from 'src/construction/domain/type/administrative-document. type';

export class AdministrativeDocumentImp implements AdministrativeDocument {
  id: string;
  no: string;
  level: string;
  date: Date;
  pursuantToDec_TCT: NestedAdministrativeDocument;
  pursuantToDec_TTMN?: NestedAdministrativeDocument;

  constructor(doc?: Partial<AdministrativeDocument>) {
    Object.assign(this, doc);
    if (!doc?.id) {
      this.id = this.date.getTime() + '-' + crypto.randomUUID();
    } else {
      this.id = doc.id;
    }
  }
}
