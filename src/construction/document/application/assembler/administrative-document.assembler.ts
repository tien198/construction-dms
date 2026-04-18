import { AdministrativeDocument } from '../../domain/administrative-document.entity';
import {
  DocumentId,
  DocumentNo,
  PursuantToDecTCT,
  PursuantToDecTTMN,
} from '../../domain/value-objects/document.vo';
import { CreateSubmissionCommand } from '../commands/create-submission/create-submission.command';

export class AdministrativeDocumentAssembler {
  static fromCmd(cmd: CreateSubmissionCommand): AdministrativeDocument {
    return new AdministrativeDocument(
      new DocumentId(null),
      new DocumentNo(cmd.no),
      cmd.level,
      new Date(cmd.date),
      new PursuantToDecTCT(cmd.pursuant_to_dec_tct_id),
      cmd.pursuant_to_dec_ttmn_id
        ? new PursuantToDecTTMN(cmd.pursuant_to_dec_ttmn_id)
        : null,
    );
  }
}
