import { v7 } from 'uuid';
import {
  ConstructionInfoId,
  ConstructionName,
  EstCostStr,
  ExistingCondition,
  RepairScope,
  SourceOfFunds,
} from '../value-objects/construction-info.vo';
import type { IConstructionInfoSnapshot } from './domain-primitive/i-construction-info';

/**
 * ConstructionInfoSnapshot — Child entity within Submission (part of Decision aggregate).
 */
export class ConstructionInfoSnapshot implements IConstructionInfoSnapshot {
  constructor(
    public id: ConstructionInfoId,

    public name: ConstructionName,
    public source_of_funds: SourceOfFunds,

    public est_cost: number,
    public est_cost_str: EstCostStr,

    public impl_start_date: Date,
    public impl_end_date: Date,

    public existing_condition_of_the_structure: ExistingCondition,
    public repair_scope: RepairScope,
  ) {
    if (!id.value) {
      this.id = ConstructionInfoId.create(v7());
    }
  }

  // Reconstitute từ DB — dùng trong repository khi load lên
}
