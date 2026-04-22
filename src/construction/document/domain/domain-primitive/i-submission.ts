import { IAdministrativeDocument } from './i-administrative-document';
import { IBidPackageSnapshot } from './i-bid-package';
import { IConstructionInfoSnapshot } from './i-construction-info';

export interface ISubmission {
  // embedded administrative-document (Value Object)
  document: IAdministrativeDocument;

  is_change_construction_info?: boolean;
  construction_info: IConstructionInfoSnapshot | null;
  bid_packages: IBidPackageSnapshot[];
}
