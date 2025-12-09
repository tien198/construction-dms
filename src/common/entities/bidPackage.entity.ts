import { BidPackage } from '../type/bidPackage.type';

export class BidPackageImp implements BidPackage {
  arrayIndex?: number;
  projectOwner: string;
  bidPackageName: string;
  shortDescription: string;
  price: number;
  contractorSelectionTime: Date;
  contractorSelectionMethod: string;
  contractType: string;
  implementDuration: string;
}
