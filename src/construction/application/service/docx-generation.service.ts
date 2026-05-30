// Builtin file system utilities
import fs from 'fs';
import path from 'path';
import { DecisionDetailResDto } from '../queries/get-decision-detail/get-decision-detail.query';
import { IDocxGenerationPort } from '../port/outbound/docx-generation/gen-docx.port';
import { DocxGeneration } from 'src/construction/domain/docx-generation/docx-generation.entity';
import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';

export class DocxGenerationService {
  constructor(private readonly _docGeneration: IDocxGenerationPort) {}

  async generate(
    period: ConstructionPeriod,
    doc: DecisionDetailResDto,
    sub_type?: 'TV' | 'TT',
  ) {
    // khi tạo file, duyệt qua từng submission của decision trả về 1 lượt
    const docNameObj = this.getDocName(period, sub_type);
    const docxEntity = new DocxGeneration(doc);
    const buffer = await this._docGeneration.generate(docName, docxEntity);
    return buffer;
  }

  async getDocumentsList() {
    const files = await fs.promises.readdir(path.resolve('public', 'template'));
    return files;
  }

  getDocName(per: ConstructionPeriod, sub_type?: 'TV' | 'TT'): DocNameObj {
    const filtered = this.docNamesList.filter((item) => item.per === per);
    if (filtered.length <= 0) {
      throw new Error('Document name not found');
    }
    let docNameObj: DocNameObj;
    if (filtered.length === 1) {
      docNameObj = filtered[0];
    }
    // filtered.length > 1
    else if (!sub_type) {
      throw new Error('Sub type is required if there are multiple decisions');
    } else {
      docNameObj = filtered.find(
        (item) => item.sub_type?.toUpperCase() === sub_type.toUpperCase(),
      )!;
    }
    return docNameObj;
  }

  private readonly docNamesList: DocNameObj[] = [
    {
      per: ConstructionPeriod.KH_LCNT,
      submission: '2. Tờ trình phê duyệt KHLCNT.docx',
      decision: '3. QD Phê duyệt KHLCNT.docx',
    },
    {
      per: ConstructionPeriod.KQ_KH_LCNT,
      sub_type: 'TV',
      submission: '4. Tờ trình phê duyệt KQLCNT TV.docx',
      decision: '5. QD Phê duyệt KQLCNT TV.docx',
    },
    {
      per: ConstructionPeriod.KQ_KH_LCNT,
      sub_type: 'TT',
      submission: '6. Tờ trình phê duyệt KQLCNT Thẩm tra.docx',
      decision: '7. QD Phê duyệt KQLCNT Thẩm tra.docx',
    },
    {
      per: ConstructionPeriod.BCKTKT,
      submission: '8. Tờ trinh PD BCKT-KT & KHLC NT.docx',
      decision: '9. QD phe duyet BC KTKT & KH LCNT.docx',
    },
  ];
}

type DocNameObj = {
  per: ConstructionPeriod;
  submission: string;
  decision: string;
  sub_type?: 'TV' | 'TT';
};

// const Period = {
//   KH_LCNT: 'KH_LCNT',
//   KQ_KH_LCNT_TV: 'KQ_KH_LCNT_TV',
//   KQ_KH_LCNT_TT: 'KQ_KH_LCNT_TT',
//   BCKTKT: 'BCKTKT',
//   TC: 'TC',
// } as const;
