import { Construction } from 'src/construction/domain/construction/construction.entity';
import { CreateSubmissionCommand } from '../../commands/create-submission/create-submission.command';
import { ConstructionId } from 'src/construction/domain/value-objects/construction.vo';
import { PursuantToDecTCT } from 'src/construction/domain/value-objects/document.vo';

export class ConstructionAssembler {
  static fromCmd(cmd: CreateSubmissionCommand): Construction {
    const con = new Construction(
      new ConstructionId(cmd.con_id),
      new PursuantToDecTCT(cmd.pursuant_to_dec_tct_id),
    );

    return con;
  }
}
