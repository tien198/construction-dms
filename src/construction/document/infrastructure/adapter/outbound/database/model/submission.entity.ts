import { Submission } from 'src/construction/document/domain/submission.entity';

export class SubmissionModel {
  id: string;
  construction_id: string;
  decision_id: string;
  construction_info_snapshot_id: string | null = null;
  is_change_construction_info: boolean = false;

  constructor(sub: Submission) {
    this.id = sub.id.value!;
    this.construction_id = sub.construction_id.value!;
    this.decision_id = sub.decision_id.value!;
    this.construction_info_snapshot_id =
      sub.construction_info_snapshot_id?.value ?? null;
    this.is_change_construction_info = sub.is_change_construction_info;
  }
}
