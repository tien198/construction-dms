import { ConstructionInfoSnapshot } from 'src/construction/document/domain/entity/construction-infor.entity';

// type Primitive = string | number | boolean | Date | null | undefined;

export type StrConvert<T> = {
  [K in keyof T]: T[K] extends Array<infer U> ? StrConvert<U>[] : string;
};

const converted: StrConvert<ConstructionInfoSnapshot> = {
  id: '',
  construction_id: '1',
  name: '1',
  source_of_funds: '1',
  est_cost: '1',
  est_cost_str: '1',
  impl_start_date: '1',
  impl_end_date: '1',
  existing_condition_of_the_structure: '1',
  repair_scope: '1',
};
