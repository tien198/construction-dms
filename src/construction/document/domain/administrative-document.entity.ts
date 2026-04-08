import { v7 } from 'uuid';
import {
  DocumentId,
  DocumentNo,
  PursuantToDecTCT,
  PursuantToDecTTMN,
} from './value-objects/document.vo';
import type { IAdministrativeDocument } from './domain-primitive/i-administrative-document';

export class AdministrativeDocument implements IAdministrativeDocument {
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

  static create(
    no: DocumentNo,
    level: string,
    date: Date,
    pursuant_to_dec_tct_id: PursuantToDecTCT,
    pursuant_to_dec_ttmn_id: PursuantToDecTTMN | null = null,
  ): AdministrativeDocument {
    return new AdministrativeDocument(
      new DocumentId(v7()),
      no,
      level,
      date,
      pursuant_to_dec_tct_id,
      pursuant_to_dec_ttmn_id,
    );
  }

  static reconstitute(
    id: DocumentId,
    no: DocumentNo,
    level: string,
    date: Date,
    pursuant_to_dec_tct_id: PursuantToDecTCT,
    pursuant_to_dec_ttmn_id: PursuantToDecTTMN | null = null,
  ): AdministrativeDocument {
    return new AdministrativeDocument(
      id,
      no,
      level,
      date,
      pursuant_to_dec_tct_id,
      pursuant_to_dec_ttmn_id,
    );
  }
}
