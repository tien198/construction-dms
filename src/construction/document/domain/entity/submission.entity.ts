import { ConstructionId } from '../value-objects/construction-id.vo';
import { DecisionId } from '../value-objects/decision-id.vo';
import { AdministrativeDocument } from './administrative-document.entity';

export class Submission {
  construction_id: ConstructionId;
  decision_id: DecisionId;
  construction_infor_snapshot_id: string;
  is_change_construction_infor?: boolean;

  // reference to administrative-document
  document: AdministrativeDocument;

  constructor(
    document: AdministrativeDocument,
    construction_id: ConstructionId,
    decision_id: DecisionId,
    construction_infor_snapshot_id: string,
    is_change_construction_infor: boolean = false,
  ) {
    this.construction_id = construction_id;
    this.decision_id = decision_id;
    this.construction_infor_snapshot_id = construction_infor_snapshot_id;
    this.is_change_construction_infor = is_change_construction_infor;

    this.document = document;
  }

  static create(
    document: AdministrativeDocument,
    construction_id: ConstructionId,
    decision_id: DecisionId,
    construction_infor_snapshot_id: string,
    is_change_construction_infor: boolean = false,
  ): Submission {
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
    construction_infor_snapshot_id: string,
    is_change_construction_infor: boolean,
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
