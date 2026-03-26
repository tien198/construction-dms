import { Decision } from '../../domain/entity/decision.entity';
import { ConstructionId } from '../../domain/value-objects/construction-id.vo';
import { CreateSubmissionCommand } from '../command/create-submission.command';
import { AdministrativeDocumentAssembler } from './administrative-document.assembler';

export class DecisionAssembler {
  static fromCmd(
    cmd: CreateSubmissionCommand,
    constructionId: ConstructionId,
  ): Decision {
    const document = AdministrativeDocumentAssembler.fromCmd(cmd);

    return Decision.create(
      document,
      constructionId,
      cmd.directlyDecision.period,
      cmd.is_change_construction_infor ?? false,
    );
  }
}
