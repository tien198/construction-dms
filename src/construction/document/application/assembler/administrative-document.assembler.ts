import { AdministrativeDocument } from '../../domain/administrative-document.entity';
import {
  DocumentNo,
  PursuantToDecTCT,
  PursuantToDecTTMN,
} from '../../domain/value-objects/document.vo';
import { CreateSubmissionCommand } from '../commands/create-submission/create-submission.command';

export class AdministrativeDocumentAssembler {
  static fromCmd(cmd: CreateSubmissionCommand): AdministrativeDocument {
    return AdministrativeDocument.create(
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
