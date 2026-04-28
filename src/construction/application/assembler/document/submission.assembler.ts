import { Submission } from 'src/construction/domain/document/submission.entity';
import { CreateSubmissionCommand } from '../../commands/create-submission/create-submission.command';
import { AdministrativeDocumentAssembler } from './administrative-document.assembler';
import { BidPackageSnapshotAssembler } from './bid-package-snapshot.assembler';
import { ConstructionInfoSnapshotAssembler } from './construction-info-snapshot.assembler';

export class SubmissionAssembler {
  static fromCmd(cmd: CreateSubmissionCommand): Submission {
    const document = AdministrativeDocumentAssembler.fromCmd(cmd);

    const bidPackages = cmd.bid_package_snapshots
      ? BidPackageSnapshotAssembler.fromCmdList(cmd.bid_package_snapshots)
      : null;

    const conInfo = cmd.construction_info_snapshot
      ? ConstructionInfoSnapshotAssembler.fromCmd(
          cmd.construction_info_snapshot,
        )
      : null;

    return new Submission(document, conInfo, bidPackages);
  }
}
