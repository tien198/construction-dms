import { ConstructionInfoSnapshot } from 'src/construction/domain/document/construction-info.entity';

export type ConstructionInfoContext = {
  construction_id: string;
  submission_id: string;
  info: ConstructionInfoSnapshot;
};
