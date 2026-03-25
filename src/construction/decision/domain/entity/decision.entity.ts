import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.type';
import { DocumentId } from '../value-objects/document-id.vo';

export class Decision {
  id: DocumentId;
  construction_id: string;
  is_change_construction_infor?: boolean;
  period: ConstructionPeriod;

  // Reference to child entity
  // administrative_document: AdministrativeDocument;

  constructor(
    id: DocumentId,
    construction_id: string,
    period: ConstructionPeriod,
    // administrative_document: AdministrativeDocument,
    is_change_construction_infor: boolean = false,
  ) {
    this.id = id;
    this.construction_id = construction_id;
    this.period = period;
    // this.administrative_document = administrative_document;
    this.is_change_construction_infor = is_change_construction_infor;
  }
}
