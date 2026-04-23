import { AdministrativeDocument } from '../../domain/administrative-document.entity';
import {
  DocumentId,
  DocumentNo,
  PursuantToDecTCT,
  PursuantToDecTTMN,
} from '../../domain/value-objects/document.vo';
import { CreateSubmissionCommand } from '../commands/create-submission/create-submission.command';

export class AdministrativeDocumentAssembler {
  static fromCmd(
    cmd: CreateSubmissionCommand,
    type: 'sub' | 'dec' = 'sub',
  ): AdministrativeDocument {
    // defined NO for submission or decision (for decision's own submision)
    const no = type === 'sub' ? cmd.no : cmd.directly_decision.no;

    return new AdministrativeDocument(
      new DocumentId(null),
      new DocumentNo(no),
      new Date(cmd.date),
      new PursuantToDecTCT(cmd.pursuant_to_dec_tct_id),
      cmd.pursuant_to_dec_ttmn_id
        ? new PursuantToDecTTMN(cmd.pursuant_to_dec_ttmn_id)
        : null,
    );
  }
}
