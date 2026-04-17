import { Construction } from '../../domain/construction.entity';
import { ConstructionInfoId } from '../../domain/value-objects/construction-info.vo';
import { PursuantToDecTCT } from '../../domain/value-objects/document.vo';
import { CreateSubmissionCommand } from '../commands/create-submission/create-submission.command';

export class ConstructionAssembler {
  static fromCmd(
    cmd: CreateSubmissionCommand,
    currentSnapshotId: ConstructionInfoId | null = null,
  ): Construction {
    return Construction.create(
      new PursuantToDecTCT(cmd.pursuant_to_dec_tct_id),
      currentSnapshotId,
    );
  }
}
