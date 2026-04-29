import { Submission } from 'src/construction/domain/document/submission.entity';

export type SubmissionContext = {
  submission: Submission;
  construction_id: string;
  decisoin_id: string;
};
