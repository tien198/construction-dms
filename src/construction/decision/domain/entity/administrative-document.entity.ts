import { DocumentId } from '../value-objects/document-id.vo';
import { DocumentNo } from '../value-objects/document-no.vo';
import {
  PursuantToDecTCT,
  PursuantToDecTTMN,
} from '../value-objects/pursuant-to-dec.vo';

export class AdministrativeDocument {
  id: DocumentId;
  no: DocumentNo;
  level: string;
  date: Date;
  pursuant_to_dec_tct_id: PursuantToDecTCT;
  pursuant_to_dec_ttmn_id: PursuantToDecTTMN | null;

  constructor(
    id: DocumentId,
    no: DocumentNo,
    level: string,
    date: Date,
    pursuant_to_dec_tct_id: PursuantToDecTCT,
    pursuant_to_dec_ttmn_id: PursuantToDecTTMN | null = null,
  ) {
    this.id = id;
    this.no = no;
    this.level = level;
    this.date = date;
    this.pursuant_to_dec_tct_id = pursuant_to_dec_tct_id;
    this.pursuant_to_dec_ttmn_id = pursuant_to_dec_ttmn_id;
  }
}
