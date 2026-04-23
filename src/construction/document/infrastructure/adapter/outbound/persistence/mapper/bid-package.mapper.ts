import { BidPackageContext } from '../dto/bid-package.context';
import { BidPackageSnapshotEntity } from '../model/bid-package.entity';

export class BidPackageMapper {
  static toPersistence(context: BidPackageContext): BidPackageSnapshotEntity {
    const bp = context.bid_package;
    const entity = new BidPackageSnapshotEntity();
    entity.id = bp.id.value!;
    entity.construction_id = context.construction_id.value!;
    entity.submission_id = context.submission.id.value!;
    entity.type = bp.type;
    entity.project_owner = bp.project_owner.value;
    entity.name = bp.name.value;
    entity.short_desc = bp.short_desc.value;

    entity.est_cost = bp.est_cost;
    entity.est_cost_str = bp.est_cost_str.value;

    entity.bidder_selection_time = bp.bidder_selection_time;
    entity.bidder_selection_method = bp.bidder_selection_method.value;

    entity.successful_bidder_id = bp.successful_bidder_id?.value ?? null;
    entity.duration = bp.duration.value;
    entity.is_completed = false; // Defaulted as it is not explicitly available in domain

    entity.created_at = new Date(Date.now());

    return entity;
  }
}
