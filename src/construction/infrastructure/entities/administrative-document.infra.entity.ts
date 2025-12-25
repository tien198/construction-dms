import { AdministrativeDocumentImp } from 'src/construction/domain/entity/administrative-document.entity';
import { AdministrativeDocument } from 'src/construction/domain/type/administrative-document.type';

export class InfraAdministrativeDocumentImp extends AdministrativeDocumentImp {
  constructor(doc?: AdministrativeDocument) {
    super(doc);
    if (doc) {
      if (!doc.id) {
        this.id = Date.now() + '-' + crypto.randomUUID();
      }
    } else {
      this.id = Date.now() + '-' + crypto.randomUUID();
    }
  }
}
