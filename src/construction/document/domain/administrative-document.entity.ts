import {
  DocumentId,
  DocumentNo,
  PursuantToDecTCT,
  PursuantToDecTTMN,
} from './value-objects/document.vo';
import type { IAdministrativeDocument } from './domain-primitive/i-administrative-document';

/**
 * AdministrativeDocument — Embedded Value Object.
 * Used within Decision and Submission as an embedded VO.
 * ID generation is handled by the parent entity (Decision or Submission).
 */
export class AdministrativeDocument implements IAdministrativeDocument {
  constructor(
    public id: DocumentId,
    public no: DocumentNo,
    public level: string,
    public date: Date,
    public pursuant_to_dec_tct_id: PursuantToDecTCT,
    public pursuant_to_dec_ttmn_id: PursuantToDecTTMN | null = null,
  ) {}
}
