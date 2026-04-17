import { Submission } from '../../domain/submission.entity';
import { ConstructionInfoId } from '../../domain/value-objects/construction-info.vo';
import { ConstructionId } from '../../domain/value-objects/construction.vo';
import { DecisionId } from '../../domain/value-objects/document.vo';
import { CreateSubmissionCommand } from '../commands/create-submission/create-submission.command';
import { AdministrativeDocumentAssembler } from './administrative-document.assembler';

export class SubmissionAssembler {
  static fromCmd(
    cmd: CreateSubmissionCommand,
    constructionId: ConstructionId,
    decisionId: DecisionId,
    constructionInforId: ConstructionInfoId | null = null,
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
