export class Submission {
  id: string;
  construction_id: string;
  decision_id: string;
  construction_infor_snapshot_id: string;
  is_change_construction_infor?: boolean;
  date?: Date;

  constructor(
    id: string,
    construction_id: string,
    decision_id: string,
    construction_infor_snapshot_id: string,
    is_change_construction_infor?: boolean,
    date?: Date,
  ) {
    this.id = id;
    this.construction_id = construction_id;
    this.decision_id = decision_id;
    this.construction_infor_snapshot_id = construction_infor_snapshot_id;
    this.is_change_construction_infor = is_change_construction_infor;
    this.date = date;
  }
}
