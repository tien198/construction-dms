import { AdministrativeDocument } from 'src/construction/document/domain/administrative-document.entity';

export class AdministrativeDocumentModel {
  id: string;
  no: string;
  level: string;
  date: Date;
  pursuant_to_dec_tct_id: string;
  pursuant_to_dec_ttmn_id: string | null = null;

  constructor(ad: AdministrativeDocument) {
    this.id = ad.id.value!;
    this.no = ad.no.value;
    this.level = ad.level;
    this.date = ad.date;
    this.pursuant_to_dec_tct_id = ad.pursuant_to_dec_tct_id.dec_id;
    this.pursuant_to_dec_ttmn_id = ad.pursuant_to_dec_ttmn_id?.dec_id ?? null;
  }
}
