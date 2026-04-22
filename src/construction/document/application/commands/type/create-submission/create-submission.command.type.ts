import { IBidPackageSnapshotCommand } from './bid-package-snapshot.type';
import { IConstructionInfoSnapshotCommand } from './construction-info-snapshot.type';
import { IDirectlyDecisionCommand } from './directly-decision';

export interface ICreateSubmissionCommand {
  // Optional between "decId" and "conId" to specify that where the submit for new Decision or existed
  con_id?: string;

  id?: string;

  no: string;

  level: string;

  date: Date;

  pursuant_to_dec_tct_id: string;

  pursuant_to_dec_ttmn_id: string | null;

  construction_info_snapshot?: IConstructionInfoSnapshotCommand;

  bid_package_snapshots?: IBidPackageSnapshotCommand[];

  directly_decision: IDirectlyDecisionCommand;
}
