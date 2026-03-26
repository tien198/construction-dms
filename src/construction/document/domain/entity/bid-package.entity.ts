import { v7 } from 'uuid';
import { BidPackageType } from 'src/construction/domain/enum/bid-package.type';

export class BidPackageSnapshot {
  id: string;
  construction_infor_snapshot_id: string;

  type: BidPackageType;
  project_owner: string;
  name: string;
  // short_description
  short_desc: string;

  est_cost: number;
  est_cost_str: string;

  bidder_selection_time: Date;
  bidder_selection_method: string;

  duration: string;
  is_completed: boolean;

  successful_bidder_id?: string;

  constructor(
    id: string,
    construction_infor_snapshot_id: string,
    type: BidPackageType,
    project_owner: string,
    name: string,
    short_desc: string,
    est_cost: number,
    est_cost_str: string,
    bidder_selection_time: Date,
    bidder_selection_method: string,
    duration: string,
    is_completed: boolean,
    successful_bidder_id?: string,
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
    construction_infor_snapshot_id: string,
    type: BidPackageType,
    project_owner: string,
    name: string,
    short_desc: string,
    est_cost: number,
    est_cost_str: string,
    bidder_selection_time: Date,
    bidder_selection_method: string,
    duration: string,
    is_completed: boolean,
    successful_bidder_id?: string,
  ): BidPackageSnapshot {
    return new BidPackageSnapshot(
      v7(),
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
    id: string,
    construction_infor_snapshot_id: string,
    type: BidPackageType,
    project_owner: string,
    name: string,
    short_desc: string,
    est_cost: number,
    est_cost_str: string,
    bidder_selection_time: Date,
    bidder_selection_method: string,
    duration: string,
    is_completed: boolean,
    successful_bidder_id?: string,
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
