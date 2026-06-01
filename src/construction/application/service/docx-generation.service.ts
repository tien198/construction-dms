// Builtin file system utilities
import fs from 'fs';
import path from 'path';
import { IDocxGenerationPort } from '../port/outbound/docx-generation/gen-docx.port';
import { DocxGeneration } from 'src/construction/domain/docx-generation/docx-generation.entity';
import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';
import type { IDocumentQueryRepository } from '../port/outbound/database/document-query.repository.port';
import { BidPackageType } from 'src/construction/domain/enum/bid-package.enum';

export class DocxGenerationService {
  constructor(
    private readonly _docGeneration: IDocxGenerationPort,
    private readonly _docQueryRepo: IDocumentQueryRepository,
  ) {}

  async generate(subId: string, docType: 'submission' | 'decision') {
    const decision =
      (await this._docQueryRepo.findDecisionBySubmissionId(subId))!;

    const docName = this.getDocName(
      decision.period,
      docType,
      decision.submissions[0].bid_package_snapshots[0].type,
    );

    //  get document info according docType
    const adminDoc =
      docType === 'submission' ? decision : decision.submissions[0];

    // There is only one submission returned in query
    const docxEntity = new DocxGeneration(adminDoc, decision.submissions[0]);
    const buffer = await this._docGeneration.generate(docName, docxEntity);
    return { buffer, docName };
  }

  async getDocumentsList() {
    const files = await fs.promises.readdir(path.resolve('public', 'template'));
    return files;
  }

  getDocName(
    per: ConstructionPeriod,
    docType: 'submission' | 'decision',
    bidPackageType?: BidPackageType,
  ): string {
    const filtered = this.docNamesList.filter((item) => item.per === per);
    if (filtered.length <= 0) {
      throw new Error('Document name not found');
    }
    let docNameObj: DocNameObj;
    if (filtered.length === 1) {
      docNameObj = filtered[0];
    }
    // filtered.length > 1
    else if (!bidPackageType) {
      throw new Error('Sub type is required if there are multiple decisions');
    } else {
      docNameObj = filtered.find(
        (item) => item.sub_type?.toUpperCase() === bidPackageType.toUpperCase(),
      )!;
    }
    const docName =
      docType === 'submission' ? docNameObj.submission : docNameObj.decision;
    return docName;
  }

  private readonly docNamesList: DocNameObj[] = [
    {
      per: ConstructionPeriod.KH_LCNT,
      submission: '2. Tờ trình phê duyệt KHLCNT.docx',
      decision: '3. QD Phê duyệt KHLCNT.docx',
    },
    {
      per: ConstructionPeriod.KQ_KH_LCNT,
      sub_type: BidPackageType.TV,
      submission: '4. Tờ trình phê duyệt KQLCNT TV.docx',
      decision: '5. QD Phê duyệt KQLCNT TV.docx',
    },
    {
      per: ConstructionPeriod.KQ_KH_LCNT,
      sub_type: BidPackageType.TT,
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
  sub_type?: BidPackageType;
};

// const Period = {
//   KH_LCNT: 'KH_LCNT',
//   KQ_KH_LCNT_TV: 'KQ_KH_LCNT_TV',
//   KQ_KH_LCNT_TT: 'KQ_KH_LCNT_TT',
//   BCKTKT: 'BCKTKT',
//   TC: 'TC',
// } as const;
