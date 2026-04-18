import { v7 } from 'uuid';
import { ConstructionId } from './value-objects/construction.vo';
import {
  ConstructionInfoId,
  ConstructionName,
  EstCostStr,
  ExistingCondition,
  RepairScope,
  SourceOfFunds,
} from './value-objects/construction-info.vo';
import type { IConstructionInfoSnapshot } from './domain-primitive/i-construction-info';
import { BidPackageSnapshot } from './bid-package.entity';

export class ConstructionInfoSnapshot implements IConstructionInfoSnapshot {
  constructor(
    public id: ConstructionInfoId,
    public construction_id: ConstructionId,

    public name: ConstructionName,
    public source_of_funds: SourceOfFunds,

    public est_cost: number,
    public est_cost_str: EstCostStr,

    public impl_start_date: Date,
    public impl_end_date: Date,

    public existing_condition_of_the_structure: ExistingCondition,
    public repair_scope: RepairScope,

    public bid_packages: BidPackageSnapshot[],
  ) {
    if (id.value === null) {
      this.id = ConstructionInfoId.create(v7());
    }
  }

  // Reconstitute từ DB — dùng trong repository khi load lên
}
