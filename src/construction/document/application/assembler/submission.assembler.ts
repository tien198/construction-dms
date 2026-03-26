import { Submission } from '../../domain/entity/submission.entity';
import { ConstructionId } from '../../domain/value-objects/construction-id.vo';
import { DecisionId } from '../../domain/value-objects/decision-id.vo';
import { CreateSubmissionCommand } from '../command/create-submission.command';
import { AdministrativeDocumentAssembler } from './administrative-document.assembler';

export class SubmissionAssembler {
  static fromCmd(
    cmd: CreateSubmissionCommand,
    constructionId: ConstructionId,
    decisionId: DecisionId,
    constructionInforSnapshotId: string,
  ): Submission {
    const document = AdministrativeDocumentAssembler.fromCmd(cmd);

    return Submission.create(
      document,
      constructionId,
      decisionId,
      constructionInforSnapshotId,
      cmd.is_change_construction_infor ?? false,
    );
  }
}
