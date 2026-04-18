import { Decision } from '../../domain/decision.entity';
import { Submission } from '../../domain/submission.entity';
import { ConstructionId } from '../../domain/value-objects/construction.vo';
import { CreateSubmissionCommand } from '../commands/create-submission/create-submission.command';
import { AdministrativeDocumentAssembler } from './administrative-document.assembler';

export class DecisionAssembler {
  static fromCmd(
    cmd: CreateSubmissionCommand,
    constructionId: ConstructionId,
    submission: Submission,
  ): Decision {
    const document = AdministrativeDocumentAssembler.fromCmd(cmd);

    return new Decision(
      document,
      constructionId,
      cmd.directlyDecision.period,
      cmd.is_change_construction_infor ?? false,
      submission,
    );
  }
}
