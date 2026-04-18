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

  is_changed_construction_info: boolean | null;

  construction_info_snapshot?: IConstructionInfoSnapshotCommand;

  directly_decision: IDirectlyDecisionCommand;
}
