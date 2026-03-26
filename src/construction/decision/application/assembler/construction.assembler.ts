import { Construction } from '../../domain/entity/construction.entity';
import { PursuantToDecTCT } from '../../domain/value-objects/pursuant-to-dec.vo';
import { CreateSubmissionCommand } from '../command/create-submission.command';

export class ConstructionAssembler {
  static toConstruction(
    cmd: CreateSubmissionCommand,
    currentSnapshotId: string,
  ): Construction {
    return Construction.create(
      new PursuantToDecTCT(cmd.pursuant_to_dec_tct_id),
      currentSnapshotId,
    );
  }
}
