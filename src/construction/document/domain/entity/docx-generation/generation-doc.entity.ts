import { AdministrativeDocument } from '../administrative-document.entity';
import { ConstructionInfoSnapshot } from '../construction-infor.entity';
import { StrConvert } from 'src/shared/type-ultility/string-converter';

export class GeneratedDocx {
  doc: StrConvert<AdministrativeDocument>;
  infor: StrConvert<ConstructionInfoSnapshot>;

  constructor(
    doc: StrConvert<AdministrativeDocument>,
    infor: StrConvert<ConstructionInfoSnapshot>,
  ) {
    this.doc = doc;
    this.infor = infor;
  }

  static create(
    doc: AdministrativeDocument,
    infor: ConstructionInfoSnapshot,
  ): GeneratedDocx {
    return new GeneratedDocx(doc, infor);
  }
}
