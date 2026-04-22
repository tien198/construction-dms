import { IAdministrativeDocument } from './i-administrative-document';
import { IBidPackageSnapshot } from './i-bid-package';
import { IConstructionInfoSnapshot } from './i-construction-info';

export interface ISubmission {
  // embedded administrative-document (Value Object)
  document: IAdministrativeDocument;

  construction_info: IConstructionInfoSnapshot | null;
  bid_packages: IBidPackageSnapshot[] | null;
}
