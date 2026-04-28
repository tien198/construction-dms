import {
  DocumentId,
  DocumentNo,
  PursuantToDecTCT,
  PursuantToDecTTMN,
} from '../../value-objects/document.vo';

export interface IAdministrativeDocument {
  id: DocumentId;
  no: DocumentNo;
  level: string;
  date: Date;
  pursuant_to_dec_tct_id: PursuantToDecTCT;
  pursuant_to_dec_ttmn_id: PursuantToDecTTMN | null;
}
