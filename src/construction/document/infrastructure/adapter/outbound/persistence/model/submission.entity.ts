export class SubmissionEntity {
  id: string;
  construction_id: string;
  decision_id: string;

  created_at: Date = new Date(Date.now());
}
