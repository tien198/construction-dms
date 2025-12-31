import { AdministrativeDocument } from 'src/construction/domain/type/administrative-document.type';
import { AdministrativeDocumentImp } from '../entity/administrative-document.entity';

export class AdministrativeDocumentViewModel extends AdministrativeDocumentImp {
  constructor(doc?: AdministrativeDocument) {
    super(doc);
  }
}
