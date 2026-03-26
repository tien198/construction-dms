import { Decision } from '../../domain/entity/decision.entity';
import { CreateSubmissionCommand } from '../command/create-submission.command';

export class DecisionAssembler {
  static toDecision(
    cmd: CreateSubmissionCommand,
    constructionId: string,
  ): Decision {
    return Decision.create(
      constructionId,
      cmd.directlyDecision.period,
      cmd.is_change_construction_infor ?? false,
    );
  }
}
