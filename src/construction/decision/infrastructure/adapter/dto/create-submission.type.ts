import type { AdministrativeDocument } from './create-administrative-document.type';
import type { ConstructionInfoSnapshot } from './create-construction-info-snapshot.type';

export interface Submission extends AdministrativeDocument {
  construction_infor_snapshot?: ConstructionInfoSnapshot | null;
  is_change_construction_infor: boolean | null;
}
