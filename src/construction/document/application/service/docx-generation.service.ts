import { Injectable } from '@nestjs/common';
import { DocNameObj, IDocxGenUseCase } from '../port/inbound/docx-gen.use-case';
import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.type';
import { AdministrativeDocument } from '../../domain/administrative-document.entity';
import { ConstructionInforSnapshot } from '../../domain/construction-infor.entity';
import { FormatService } from './format.service';
import { Inject } from '@nestjs/common';
import type { IDocxGenerationPort } from '../port/outbound/docx-generation/gen-docx.port';
import { GeneratedDocx } from '../../domain/docx-generation/generation-doc.entity';
import { AdminDoc_Docx } from '../../domain/docx-generation/administrative-document.docx.entity';

@Injectable()
export class DocxGenerationService implements IDocxGenUseCase {
  constructor(
    private readonly _formateService: FormatService,
    @Inject('IDocxGenerationPort')
    private readonly _docxGenerationPort: IDocxGenerationPort,
  ) {}

  async generateDocx(
    docName: string,
    doc: AdministrativeDocument,
    infor: ConstructionInforSnapshot,
  ): Promise<Buffer> {
    const doc = new AdminDoc_Docx({
      id: doc.id.value,
      no: doc.no.value,
      level: doc.level,
      date: this._formateService.formatDate(doc.date),
      dec_no_pursued_tct: doc.dec_no_pursued_tct.value,
      dec_no_pursued_ttmn: doc.dec_no_pursued_ttmn.value,
    });
    const docx = new GeneratedDocx(doc, infor);
    return this._docxGenerationPort.generate(docName, docx);
  }

  async getDocList() {
    const files = await fs.promises.readdir(path.resolve('public', 'template'));
    return files;
  }

  getDocName(per: ConstructionPeriod): DocNameObj {
    switch (per) {
      case ConstructionPeriod.KH_TV_TT:
        return {
          submission: '2. Tờ trình phê duyệt KHLCNT.docx',
          decision: '3. QD Phê duyệt KHLCNT.docx',
        };
      case ConstructionPeriod.TV:
        return {
          submission: '4. Tờ trình phê duyệt KQLCNT TV.docx',
          decision: '5. QD Phê duyệt KQLCNT TV.docx',
        };
      case ConstructionPeriod.TT:
        return {
          submission: 'tt-submission.docx',
          decision: 'tt-decision.docx',
        };
      case ConstructionPeriod.BCKTKT:
        return {
          submission: 'bcktkt-submission.docx',
          decision: 'bcktkt-decision.docx',
        };
    }
  }
}
