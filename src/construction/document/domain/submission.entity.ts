import { ISubmission } from './domain-primitive/i-submission';
import { ConstructionInfoId } from './value-objects/construction-info.vo';
import { ConstructionId } from './value-objects/construction.vo';
import { DecisionId, DocumentId } from './value-objects/document.vo';
import { AdministrativeDocument } from './administrative-document.entity';

export class Submission implements ISubmission {
  construction_id: ConstructionId;
  decision_id: DecisionId;
  construction_info_snapshot_id: ConstructionInfoId | null;
  is_change_construction_info?: boolean;

  // reference to administrative-document
  document: AdministrativeDocument | DocumentId;

  constructor(
    document: AdministrativeDocument | DocumentId,
    construction_id: ConstructionId,
    decision_id: DecisionId,
    construction_info_snapshot_id: ConstructionInfoId | null = null,
    is_change_construction_info: boolean = false,
  ) {
    this.construction_id = construction_id;
    this.decision_id = decision_id;
    this.construction_info_snapshot_id = construction_info_snapshot_id;
    this.is_change_construction_info = is_change_construction_info;

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
    construction_info_snapshot_id: ConstructionInfoId | null = null,
  ): Submission {
    const is_change_construction_info = !!construction_info_snapshot_id;

    return new Submission(
      document,
      construction_id,
      decision_id,
      construction_info_snapshot_id,
      is_change_construction_info,
    );
  }

  // Reconstitute từ DB — dùng trong repository khi load lên
  static reconstitute(
    document: AdministrativeDocument,
    construction_id: ConstructionId,
    decision_id: DecisionId,
    is_change_construction_info: boolean,
    construction_info_snapshot_id: ConstructionInfoId | null = null,
  ): Submission {
    return new Submission(
      document,
      construction_id,
      decision_id,
      construction_info_snapshot_id,
      is_change_construction_info,
    );
  }
}
