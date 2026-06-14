import { StrConvert } from 'src/shared/type-ultility/string-converter';
import { TemplaterAdminDocument } from './administrative-document.docx.entity';
import { ConstructionInfoSnapshot } from 'src/construction/domain/document/construction-info.entity';
import { SubmissionResDto } from 'src/construction/application/queries/get-decision-detail/dto/submission.res-dto';
import { AdminDocResDto } from 'src/construction/application/queries/get-decision-detail/dto/admin-doc.res-dto';
import { BidPackageSnapshotResDto } from 'src/construction/application/queries/get-decision-detail/dto/bid-package.res-dto';
import { DocxGenerationBidPackage } from './docx-generation.bid-package.entity';
import { BidPackageType } from '../enum/bid-package.enum';
import { DocxGenerationBidder } from './docx-generation-bidder.entity';

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
  TV_bid_package: DocxGenerationBidPackage | null;
  TT_bid_package: DocxGenerationBidPackage | null;
  TC_bid_package: DocxGenerationBidPackage | null;

  bid_package_total: string;
  completed_works_total: string;
  bidder_selection_works_total: string;
  // if docx is decision, format sub_no of decision
  sub_no: string;

  constructor(doc: AdminDocResDto, subInfo: SubmissionResDto) {
    super(doc);
    this.date = this.signingDateFormat(subInfo.date);

    // _____ construction_info_snapshot _________
    const info = subInfo.construction_info_snapshot;
    this.name = info.name;
    this.source_of_funds = info.source_of_funds;
    // impl - implementation
    this.impl_start_date = info.impl_start_date;
    this.impl_end_date = info.impl_end_date;
    //
    this.existing_condition_of_the_structure =
      info.existing_condition_of_the_structure;
    this.repair_scope = info.repair_scope;
    // est - estimated
    this.est_cost = this.formatCurrency(info.est_cost);
    this.est_cost_str = info.est_cost_str;

    this.impl_duration = this.implDurationFormat();
    // ______ bid_packages _______________________
    this.bid_packages = subInfo.bid_package_snapshots.map((bp) =>
      this.convertBidPackageResDtoToEntity(bp),
    );

    this.TV_bid_package =
      this.bid_packages.find((b) => b.type == BidPackageType.TV) ?? null;
    this.TT_bid_package =
      this.bid_packages.find((b) => b.type == BidPackageType.TT) ?? null;
    this.TC_bid_package =
      this.bid_packages.find((b) => b.type == BidPackageType.TC) ?? null;

    this.bid_package_total = this.formatCurrency(
      subInfo.bid_package_snapshots.reduce((acc, bp) => acc + bp.est_cost, 0),
    );
    this.completed_works_total = this.formatCurrency(
      subInfo.bid_package_snapshots
        .filter((bp) => bp.type !== BidPackageType.TC)
        .reduce((acc, bp) => acc + bp.est_cost, 0),
    );

    this.bidder_selection_works_total = this.formatCurrency(
      subInfo.bid_package_snapshots
        .filter((bp) => bp.type === BidPackageType.TC)
        .reduce((acc, bp) => acc + bp.est_cost, 0),
    );

    this.sub_no = this.formatDocNo(subInfo);
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
    bidPackage: BidPackageSnapshotResDto,
  ): DocxGenerationBidPackage {
    const entity = new DocxGenerationBidPackage(bidPackage);

    return entity;
  }
}
