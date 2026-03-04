import { ConstructionInfor } from './construction-infor.type';
import { PrintBidPackage } from './print-bid-package.type';

export interface PrintConstructionInfor
  extends Omit<
    ConstructionInfor,
    | 'cost'
    | 'constructionImplementationTime'
    | 'bidPackages'
    | 'estimatedCost'
    | 'estimatedCostString'
  > {
  cost: string;
  constructionImplementationTime: string;
  bidPackages: PrintBidPackage[];

  estimatedCost: string;
  estimatedCostString: string;
}
