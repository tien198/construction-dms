import { BidPackageSnapshot } from 'src/construction/document/domain/bid-package.entity';

export class BidPackageSnapshotModel {
  public id: string;
  public construction_info_snapshot_id: string;
  public type: string;
  public project_owner: string;
  public name: string;
  public short_desc: string;
  public est_cost: number;
  public est_cost_str: string;
  public bidder_selection_time: Date;
  public bidder_selection_method: string;
  public duration: string;
  public is_completed: boolean;
  public successful_bidder_id: string | null = null;

  constructor(bidPackage: BidPackageSnapshot) {
    this.id = bidPackage.id.value!;
    this.construction_info_snapshot_id =
      bidPackage.construction_info_snapshot_id.value!;
    this.type = bidPackage.type;
    this.project_owner = bidPackage.project_owner.value;
    this.name = bidPackage.name.value;
    this.short_desc = bidPackage.short_desc.value;
    this.est_cost = bidPackage.est_cost;
    this.est_cost_str = bidPackage.est_cost_str.value;
    this.bidder_selection_time = bidPackage.bidder_selection_time;
    this.bidder_selection_method = bidPackage.bidder_selection_method.value;
    this.duration = bidPackage.duration.value;
    this.is_completed = bidPackage.is_completed;
    this.successful_bidder_id = bidPackage.successful_bidder_id?.value ?? null;
  }
}
