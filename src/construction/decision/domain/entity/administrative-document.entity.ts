export class AdministrativeDocument {
  id: string;
  no: string;
  level: string;
  date: Date;
  pursuant_to_dec_tct_id: string;
  pursuant_to_dec_ttmn_id: string | null;

  constructor(
    id: string,
    no: string,
    level: string,
    date: Date,
    pursuant_to_dec_tct_id: string,
    pursuant_to_dec_ttmn_id: string | null = null,
  ) {
    this.id = id;
    this.no = no;
    this.level = level;
    this.date = date;
    this.pursuant_to_dec_tct_id = pursuant_to_dec_tct_id;
    this.pursuant_to_dec_ttmn_id = pursuant_to_dec_ttmn_id;
  }
}
