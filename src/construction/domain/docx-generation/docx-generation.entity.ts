import { StrConvert } from 'src/shared/type-ultility/string-converter';
import { TemplaterAdminDocument } from './administrative-document.docx.entity';
import { ConstructionInfoSnapshot } from 'src/construction/domain/document/construction-info.entity';
import { SubmissionResDto } from 'src/construction/application/queries/get-decision-detail/dto/submission.res-dto';
import { AdminDocResDto } from 'src/construction/application/queries/get-decision-detail/dto/admin-doc.res-dto';
import { BidPackageResDto } from 'src/construction/application/queries/get-decision-detail/dto/bid-package.res-dto';
import { DocxGenerationBidPackage } from './docx-generation.bid-package.entity';

type ITemplaterConInfor = StrConvert<ConstructionInfoSnapshot>;

export class DocxGeneration
  extends TemplaterAdminDocument
  implements ITemplaterConInfor
{
  name: string;
  source_of_funds: string;
  est_cost: string;
  est_cost_str: string;
  impl_start_date: string;
  impl_end_date: string;
  existing_condition_of_the_structure: string;
  repair_scope: string;
  impl_duration: string;
  bid_packages: DocxGenerationBidPackage[];

  constructor(doc: AdminDocResDto, subInfo: SubmissionResDto) {
    super(doc);

    // _____ construction_info_snapshot _________
    const info = subInfo.construction_info_snapshot;
    this.name = info.name;
    this.source_of_funds = info.source_of_funds;
    // impl - implementation
    this.impl_start_date = info.impl_start_date;
    this.impl_end_date = info.impl_end_date;
    this.impl_duration = this.implDurationFormat();
    //
    this.existing_condition_of_the_structure =
      info.existing_condition_of_the_structure;
    this.repair_scope = info.repair_scope;
    // est - estimated
    this.est_cost = this.formatCurrency(info.est_cost);
    this.est_cost_str = info.est_cost_str;

    // ______ bid_packages _______________________
    this.bid_packages = subInfo.bid_package_snapshots.map((bp) =>
      this.convertBidPackageResDtoToEntity(bp),
    );
  }

  private implDurationFormat(): string {
    const startDate = this.monthFormat(this.impl_start_date);
    const endDate = this.monthFormat(this.impl_end_date);
    const endYear = new Date(this.impl_end_date).getFullYear();
    return `${startDate} - ${endDate} năm ${endYear}`;
  }

  private monthFormat(date: string): string {
    const formater = new Intl.DateTimeFormat('vi-VN', {
      month: 'long',
    });
    return formater.format(new Date(date));
  }

  private convertBidPackageResDtoToEntity(
    bidPackages: BidPackageResDto,
  ): DocxGenerationBidPackage {
    const entity = new DocxGenerationBidPackage();
    entity.type = bidPackages.type;
    entity.project_owner = bidPackages.project_owner;
    entity.name = bidPackages.name;
    entity.short_desc = bidPackages.short_desc;
    entity.est_cost = this.formatCurrency(bidPackages.est_cost);
    entity.est_cost_str = bidPackages.est_cost_str;
    entity.bidder_selection_time = this.formatDate(
      bidPackages.bidder_selection_time,
      'month',
    );
    entity.bidder_selection_method = bidPackages.bidder_selection_method;
    entity.successful_bidder_id = bidPackages.successful_bidder_id || '';
    entity.duration = bidPackages.duration;
    entity.is_completed = bidPackages.is_completed;
    return entity;
  }
}
