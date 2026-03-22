export interface Submission {
  id: string;
  construction_id: string;
  decision_id: string;
  construction_infor_snapshot_id: number;
  is_change_construction_infor?: boolean;
  date?: Date;
}
