import { BidPackage } from './bidPackage.type';
import { ConstructionInfor } from './constructionInfor.type';
import { ConstructionPeriod } from './construction.type';
import { AdministrativeDocument } from './administrativeDocument. type';

export interface Submission extends AdministrativeDocument {
  period: ConstructionPeriod;
  constructionInfor: ConstructionInfor;
  bidPackages: BidPackage[];
}
