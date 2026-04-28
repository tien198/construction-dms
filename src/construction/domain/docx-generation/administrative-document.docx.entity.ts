import { StrConvert } from 'src/shared/type-ultility/string-converter';
import { AdministrativeDocument } from 'src/construction/domain/document/administrative-document.entity';

export class AdminDoc_Docx implements Omit<
  StrConvert<AdministrativeDocument>,
  'pursuant_to_dec_tct_id' | 'pursuant_to_dec_ttmn_id'
> {
  id: string;
  no: string;
  level: string;
  date: string;
  dec_no_pursued_tct: string;
  dec_no_pursued_ttmn: string;

  constructor(doc: AdminDoc_Docx) {
    this.id = doc.id;
    this.no = doc.no;
    this.level = doc.level;
    this.date = doc.date;
    this.dec_no_pursued_tct = doc.dec_no_pursued_tct;
    this.dec_no_pursued_ttmn = doc.dec_no_pursued_ttmn;
  }
}
