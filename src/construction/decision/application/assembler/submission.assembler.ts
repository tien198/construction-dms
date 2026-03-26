import { Submission } from '../../domain/entity/submission.entity';
import { CreateSubmissionCommand } from '../command/create-submission.command';

export class SubmissionAssembler {
  static toSubmission(
    cmd: CreateSubmissionCommand,
    constructionId: string,
    decisionId: string,
    constructionInforSnapshotId: string,
  ): Submission {
    return Submission.create(
      constructionId,
      decisionId,
      constructionInforSnapshotId,
      cmd.is_change_construction_infor ?? false,
    );
  }
}
