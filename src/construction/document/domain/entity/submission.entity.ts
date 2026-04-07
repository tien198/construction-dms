import { ConstructionInforId } from '../value-objects/construction-infor.vo';
import { ConstructionId } from '../value-objects/construction.vo';
import { DecisionId, DocumentId } from '../value-objects/document.vo';
import { AdministrativeDocument } from './administrative-document.entity';

export class Submission {
  construction_id: ConstructionId;
  decision_id: DecisionId;
  construction_infor_snapshot_id: ConstructionInforId | null;
  is_change_construction_infor?: boolean;

  // reference to administrative-document
  document: AdministrativeDocument | DocumentId;

  constructor(
    document: AdministrativeDocument | DocumentId,
    construction_id: ConstructionId,
    decision_id: DecisionId,
    construction_infor_snapshot_id: ConstructionInforId | null = null,
    is_change_construction_infor: boolean = false,
  ) {
    this.construction_id = construction_id;
    this.decision_id = decision_id;
    this.construction_infor_snapshot_id = construction_infor_snapshot_id;
    this.is_change_construction_infor = is_change_construction_infor;

    this.document = document;
  }

  get id() {
    if (this.document instanceof AdministrativeDocument) {
      return this.document.id;
    }
    return this.document;
  }

  static create(
    document: AdministrativeDocument,
    construction_id: ConstructionId,
    decision_id: DecisionId,
    construction_infor_snapshot_id: ConstructionInforId | null = null,
  ): Submission {
    const is_change_construction_infor = !!construction_infor_snapshot_id;

    return new Submission(
      document,
      construction_id,
      decision_id,
      construction_infor_snapshot_id,
      is_change_construction_infor,
    );
  }

  // Reconstitute từ DB — dùng trong repository khi load lên
  static reconstitute(
    document: AdministrativeDocument,
    construction_id: ConstructionId,
    decision_id: DecisionId,
    is_change_construction_infor: boolean,
    construction_infor_snapshot_id: ConstructionInforId | null = null,
  ): Submission {
    return new Submission(
      document,
      construction_id,
      decision_id,
      construction_infor_snapshot_id,
      is_change_construction_infor,
    );
  }
}
