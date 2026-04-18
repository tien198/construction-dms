import { v7 } from 'uuid';
import {
  DocumentId,
  DocumentNo,
  PursuantToDecTCT,
  PursuantToDecTTMN,
} from './value-objects/document.vo';
import type { IAdministrativeDocument } from './domain-primitive/i-administrative-document';

export class AdministrativeDocument implements IAdministrativeDocument {
  constructor(
    public id: DocumentId,
    public no: DocumentNo,
    public level: string,
    public date: Date,
    public pursuant_to_dec_tct_id: PursuantToDecTCT,
    public pursuant_to_dec_ttmn_id: PursuantToDecTTMN | null = null,
  ) {
    if (id.value === null) {
      this.id = DocumentId.create(v7());
    }
  }

  // Reconstitute từ DB — dùng trong repository khi load lên
}
