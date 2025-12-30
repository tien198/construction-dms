import { ConstructionInfor } from './construction-infor.type';
import { PrintBidPackage } from './print-bid-package.type';

export interface PrintConstructionInfor
  extends Omit<
    ConstructionInfor,
    'cost' | 'constructionImplementationTime' | 'bidPackages' | 'packagesAmount'
  > {
  cost: string;
  constructionImplementationTime: string;
  bidPackages: PrintBidPackage[];
  packagesAmount: string;
}
