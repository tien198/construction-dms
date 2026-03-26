import { Construction } from '../../domain/entity/construction.entity';
import { ConstructionInfoSnapshotId } from '../../domain/value-objects/construction-infor.vo';
import { PursuantToDecTCT } from '../../domain/value-objects/document.vo';
import { CreateSubmissionCommand } from '../command/create-submission.command';

export class ConstructionAssembler {
  static fromCmd(
    cmd: CreateSubmissionCommand,
    currentSnapshotId: ConstructionInfoSnapshotId | null = null,
  ): Construction {
    return Construction.create(
      new PursuantToDecTCT(cmd.pursuant_to_dec_tct_id),
      currentSnapshotId,
    );
  }
}
