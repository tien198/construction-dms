import { v7 } from 'uuid';
import { DocumentId } from '../value-objects/document-id.vo';

export class Submission {
  id: DocumentId;
  construction_id: string;
  decision_id: string;
  construction_infor_snapshot_id: string;
  is_change_construction_infor?: boolean;

  constructor(
    id: DocumentId,
    construction_id: string,
    decision_id: string,
    construction_infor_snapshot_id: string,
    is_change_construction_infor: boolean = false,
  ) {
    this.id = id;
    this.construction_id = construction_id;
    this.decision_id = decision_id;
    this.construction_infor_snapshot_id = construction_infor_snapshot_id;
    this.is_change_construction_infor = is_change_construction_infor;
  }

  static create(
    construction_id: string,
    decision_id: string,
    construction_infor_snapshot_id: string,
    is_change_construction_infor: boolean = false,
  ): Submission {
    return new Submission(
      new DocumentId(v7()),
      construction_id,
      decision_id,
      construction_infor_snapshot_id,
      is_change_construction_infor,
    );
  }

  // Reconstitute từ DB — dùng trong repository khi load lên
  static reconstitute(
    id: DocumentId,
    construction_id: string,
    decision_id: string,
    construction_infor_snapshot_id: string,
    is_change_construction_infor: boolean,
  ): Submission {
    return new Submission(
      id,
      construction_id,
      decision_id,
      construction_infor_snapshot_id,
      is_change_construction_infor,
    );
  }
}
