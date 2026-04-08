import { Submission } from '../../domain/submission.entity';
import { ConstructionInforId } from '../../domain/value-objects/construction-infor.vo';
import { ConstructionId } from '../../domain/value-objects/construction.vo';
import { DecisionId } from '../../domain/value-objects/document.vo';
import { CreateSubmissionCommand } from '../command/create-submission.command';
import { AdministrativeDocumentAssembler } from './administrative-document.assembler';

export class SubmissionAssembler {
  static fromCmd(
    cmd: CreateSubmissionCommand,
    constructionId: ConstructionId,
    decisionId: DecisionId,
    constructionInforId: ConstructionInforId | null = null,
  ): Submission {
    const document = AdministrativeDocumentAssembler.fromCmd(cmd);

    return Submission.create(
      document,
      constructionId,
      decisionId,
      constructionInforId,
    );
  }
}
