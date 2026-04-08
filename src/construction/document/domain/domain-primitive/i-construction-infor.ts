import { ConstructionId } from '../value-objects/construction.vo';
import {
  ConstructionInforId,
  ConstructionName,
  EstCostStr,
  ExistingCondition,
  RepairScope,
  SourceOfFunds,
} from '../value-objects/construction-infor.vo';

export interface IConstructionInforSnapshot {
  id: ConstructionInforId;
  construction_id: ConstructionId;

  name: ConstructionName;
  source_of_funds: SourceOfFunds;

  est_cost: number;
  est_cost_str: EstCostStr;

  impl_start_date: Date;
  impl_end_date: Date;

  existing_condition_of_the_structure: ExistingCondition;
  repair_scope: RepairScope;
}
