import { ConstructionInfoSnapshot } from '../construction-info.entity';
import { StrConvert } from 'src/shared/type-ultility/string-converter';
import { AdminDoc_Docx } from './administrative-document.docx.entity';

type IConInfor_Docx = StrConvert<ConstructionInfoSnapshot>;

export class GeneratedDocx extends AdminDoc_Docx implements IConInfor_Docx {
  // ConstructionInfoSnapshot fields (as string)
  construction_id: string;
  name: string;
  source_of_funds: string;
  est_cost: string;
  est_cost_str: string;
  impl_start_date: string;
  impl_end_date: string;
  existing_condition_of_the_structure: string;
  repair_scope: string;

  constructor(doc: AdminDoc_Docx, infor: IConInfor_Docx) {
    // AdministrativeDocument
    super(doc);

    // ConstructionInfoSnapshot
    this.construction_id = infor.construction_id;
    this.name = infor.name;
    this.source_of_funds = infor.source_of_funds;
    this.est_cost = infor.est_cost;
    this.est_cost_str = infor.est_cost_str;
    this.impl_start_date = infor.impl_start_date;
    this.impl_end_date = infor.impl_end_date;
    this.existing_condition_of_the_structure =
      infor.existing_condition_of_the_structure;
    this.repair_scope = infor.repair_scope;
  }
}
