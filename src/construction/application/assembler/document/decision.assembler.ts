import { Decision } from 'src/construction/domain/document/decision.entity';
import { ConstructionId } from 'src/construction/domain/value-objects/construction.vo';
import { CreateSubmissionCommand } from '../../commands/create-submission/create-submission.command';
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
    const conId = new ConstructionId(cmd.con_id);
    const decAdDoc = AdministrativeDocumentAssembler.fromCmd(cmd, 'dec');
    const subDomain = SubmissionAssembler.fromCmd(cmd);

    return new Decision(decAdDoc, conId, cmd.directly_decision.period, [
      subDomain,
    ]);
  }
}
