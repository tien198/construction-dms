import { Submission } from 'src/construction/document/domain/submission.entity';

export type SubmissionContext = {
  submission: Submission;
  construction_id: string;
};
