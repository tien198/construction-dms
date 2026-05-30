import { StrConvert } from 'src/shared/type-ultility/string-converter';
import { AdministrativeDocument } from 'src/construction/domain/document/administrative-document.entity';
import {
  AdminDocResDto,
  DecisionRef,
} from 'src/construction/application/queries/get-decision-detail/dto/admin-doc.res-dto';

export class TemplaterAdminDocument implements Omit<
  StrConvert<AdministrativeDocument>,
  'pursuant_to_dec_tct_id' | 'pursuant_to_dec_ttmn_id'
> {
  id: string;
  level: string;
  no: string;
  date: string;
  tct_pursuanted_dec_no: string;
  ttmn_pursuanted_dec_no: string;

  constructor(doc: AdminDocResDto) {
    this.id = doc.id;
    this.no = doc.no;
    this.level = doc.level;
    this.date = this.signingDateFormat(doc.date);
    //____________ format dec no and date
    this.tct_pursuanted_dec_no = this.formatDec(doc.pursuant_to_dec_tct);
    this.ttmn_pursuanted_dec_no = this.formatDec(doc.pursuant_to_dec_ttmn);
  }

  private signingDateFormat(date: string): string {
    const formater = new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formater.format(new Date(date));
  }

  private formatDec(dec?: DecisionRef | null) {
    if (!dec) return '';
    return dec.no + ' ngày ' + new Date(dec.date).toLocaleDateString('vi-VN');
  }
}
