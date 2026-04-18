import { Decision } from '../../domain/decision.entity';
import { Submission } from '../../domain/submission.entity';
import type { ICreateSubmissionCommand } from '../commands/type/create-submission/create-submission.command.type';
import { AdministrativeDocumentAssembler } from './administrative-document.assembler';

export class DecisionAssembler {
  static fromCmd(
    cmd: ICreateSubmissionCommand,
    submission: Submission,
  ): Decision {
    const document = AdministrativeDocumentAssembler.fromCmd(cmd);

    return new Decision(
      document,
      cmd.directly_decision.period,
      cmd.is_changed_construction_info ?? false,
      submission,
    );
  }
}
