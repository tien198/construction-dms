import { ConstructionInfor } from './construction-infor.type';
import { PrintBidPackage } from './print-bid-package.type';

export interface PrintConstructionInfor
  extends Omit<
    ConstructionInfor,
    'constructionImplementationTime' | 'bidPackages' | 'packagesAmount'
  > {
  constructionImplementationTime: string;
  bidPackages: PrintBidPackage[];
  packagesAmount: string;
}
