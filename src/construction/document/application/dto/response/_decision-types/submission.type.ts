import type { ConstructionInfoResDto } from './construction-info.res-dto';
import { AdminDocResDto } from './admin-doc.res-dto';

export class Submission extends AdminDocResDto {
  construction_infor_snapshot?: ConstructionInfoResDto | null;
  is_change_construction_infor: boolean | null;
}
