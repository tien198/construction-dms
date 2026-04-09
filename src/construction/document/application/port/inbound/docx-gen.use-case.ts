import { AdministrativeDocument } from 'src/construction/document/domain/administrative-document.entity';
import { ConstructionInforSnapshot } from 'src/construction/document/domain/construction-infor.entity';
import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';

export interface IDocxGenUseCase {
  generateDocx(
    docName: string,
    doc: AdministrativeDocument,
    infor: ConstructionInforSnapshot,
  ): Promise<Buffer>;

  // get document's names list from template folder
  getDocList(): Promise<string[]>;

  // get document's names by construction period
  getDocName(per: ConstructionPeriod): DocNameObj;
}

export type DocNameObj = {
  submission: string;
  decision: string;
};
