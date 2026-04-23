import { Decision } from '../../domain/decision.entity';
import { ConstructionId } from '../../domain/value-objects/construction.vo';
import { CreateSubmissionCommand } from '../commands/create-submission/create-submission.command';
import { AdministrativeDocumentAssembler } from './administrative-document.assembler';
import { SubmissionAssembler } from './submission.assembler';

/**
 * DecisionAssembler — Builds the entire Decision aggregate from a command.
 */
export class DecisionAssembler {
  /**
   * Build a full Decision aggregate for initializing a brand new construction.
   */
  static fromCmd(cmd: CreateSubmissionCommand): Decision {
    const constructionId = new ConstructionId(cmd.con_id);
    const adminDoc = AdministrativeDocumentAssembler.fromCmd(cmd, 'dec');
    const submission = SubmissionAssembler.fromCmd(cmd);

    return new Decision(
      adminDoc,
      constructionId,
      cmd.directly_decision.period,
      [submission],
    );
  }
}
