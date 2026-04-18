import {
  ConstructionInfoId,
  ConstructionName,
  EstCostStr,
  ExistingCondition,
  RepairScope,
  SourceOfFunds,
} from '../value-objects/construction-info.vo';
import { IBidPackageSnapshot } from './i-bid-package';

export interface IConstructionInfoSnapshot {
  id: ConstructionInfoId;

  name: ConstructionName;
  source_of_funds: SourceOfFunds;

  est_cost: number;
  est_cost_str: EstCostStr;

  impl_start_date: Date;
  impl_end_date: Date;

  existing_condition_of_the_structure: ExistingCondition;
  repair_scope: RepairScope;

  bid_packages: IBidPackageSnapshot[];
}
