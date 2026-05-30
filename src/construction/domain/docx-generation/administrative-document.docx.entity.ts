import { StrConvert } from 'src/shared/type-ultility/string-converter';
import { AdministrativeDocument } from 'src/construction/domain/document/administrative-document.entity';
import {
  AdminDocResDto,
  DecisionRef,
} from 'src/construction/application/queries/get-decision-detail/dto/admin-doc.res-dto';
import { DocxFormater } from './docx-formater';

export class TemplaterAdminDocument
  extends DocxFormater
  implements
    Omit<
      StrConvert<AdministrativeDocument>,
      'pursuant_to_dec_tct_id' | 'pursuant_to_dec_ttmn_id'
    >
{
  id: string;
  level: string;
  no: string;
  date: string;
  tct_pursuanted_dec_no: string;
  ttmn_pursuanted_dec_no: string;

  constructor(doc: AdminDocResDto) {
    super();

    this.id = doc.id;
    this.no = doc.no;
    this.level = doc.level;
    this.date = this.signingDateFormat(doc.date);
    //____________ format dec no and date
    this.tct_pursuanted_dec_no = this.formatDec(doc.pursuant_to_dec_tct);
    this.ttmn_pursuanted_dec_no = this.formatDec(doc.pursuant_to_dec_ttmn);
  }

  private signingDateFormat(date: string): string {
    return this.toFormalDate(date);
  }

  private formatDec(dec?: DecisionRef | null) {
    if (!dec) return '';
    const localDateStr = new Date(dec.date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return dec.no + ' ngày ' + localDateStr;
  }
}
