import { v7 } from 'uuid';
import { BidPackageType } from 'src/construction/domain/enum/bid-package.enum';
import { ConstructionInforId } from './value-objects/construction-infor.vo';
import {
  BidderSelectionMethod,
  BidPackageId,
  BidPackageName,
  Duration,
  EstCostStr,
  ProjectOwner,
  ShortDesc,
  SuccessfulBidderId,
} from './value-objects/bid-package-snapshot.vo';
import type { IBidPackageSnapshot } from './domain-primitive/i-bid-package';

export class BidPackageSnapshot implements IBidPackageSnapshot {
  id: BidPackageId;
  construction_infor_snapshot_id: ConstructionInforId;

  type: BidPackageType;
  project_owner: ProjectOwner;
  name: BidPackageName;
  // short_description
  short_desc: ShortDesc;

  est_cost: number;
  est_cost_str: EstCostStr;

  bidder_selection_time: Date;
  bidder_selection_method: BidderSelectionMethod;

  duration: Duration;
  is_completed: boolean;

  successful_bidder_id: SuccessfulBidderId | null;

  constructor(
    id: BidPackageId,
    construction_infor_snapshot_id: ConstructionInforId,
    type: BidPackageType,
    project_owner: ProjectOwner,
    name: BidPackageName,
    short_desc: ShortDesc,
    est_cost: number,
    est_cost_str: EstCostStr,
    bidder_selection_time: Date,
    bidder_selection_method: BidderSelectionMethod,
    duration: Duration,
    is_completed: boolean,
    successful_bidder_id: SuccessfulBidderId | null = null,
  ) {
    this.id = id;
    this.construction_infor_snapshot_id = construction_infor_snapshot_id;
    this.type = type;
    this.project_owner = project_owner;
    this.name = name;
    this.short_desc = short_desc;
    this.est_cost = est_cost;
    this.est_cost_str = est_cost_str;
    this.bidder_selection_time = bidder_selection_time;
    this.bidder_selection_method = bidder_selection_method;
    this.duration = duration;
    this.is_completed = is_completed;
    this.successful_bidder_id = successful_bidder_id;
  }

  static create(
    construction_infor_snapshot_id: ConstructionInforId,
    type: BidPackageType,
    project_owner: ProjectOwner,
    name: BidPackageName,
    short_desc: ShortDesc,
    est_cost: number,
    est_cost_str: EstCostStr,
    bidder_selection_time: Date,
    bidder_selection_method: BidderSelectionMethod,
    duration: Duration,
    is_completed: boolean,
    successful_bidder_id: SuccessfulBidderId | null,
  ): BidPackageSnapshot {
    return new BidPackageSnapshot(
      BidPackageId.create(v7()),
      construction_infor_snapshot_id,
      type,
      project_owner,
      name,
      short_desc,
      est_cost,
      est_cost_str,
      bidder_selection_time,
      bidder_selection_method,
      duration,
      is_completed,
      successful_bidder_id,
    );
  }

  static reconstitute(
    id: BidPackageId,
    construction_infor_snapshot_id: ConstructionInforId,
    type: BidPackageType,
    project_owner: ProjectOwner,
    name: BidPackageName,
    short_desc: ShortDesc,
    est_cost: number,
    est_cost_str: EstCostStr,
    bidder_selection_time: Date,
    bidder_selection_method: BidderSelectionMethod,
    duration: Duration,
    is_completed: boolean,
    successful_bidder_id?: SuccessfulBidderId,
  ): BidPackageSnapshot {
    return new BidPackageSnapshot(
      id,
      construction_infor_snapshot_id,
      type,
      project_owner,
      name,
      short_desc,
      est_cost,
      est_cost_str,
      bidder_selection_time,
      bidder_selection_method,
      duration,
      is_completed,
      successful_bidder_id,
    );
  }
}
