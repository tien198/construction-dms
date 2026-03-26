import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.type';
import { DocumentId } from '../value-objects/document-id.vo';
import { v7 } from 'uuid';

export class Decision {
  id: DocumentId;
  construction_id: string;
  is_change_construction_infor?: boolean;
  period: ConstructionPeriod;

  constructor(
    id: DocumentId,
    construction_id: string,
    period: ConstructionPeriod,
    is_change_construction_infor: boolean = false,
  ) {
    this.id = id;
    this.construction_id = construction_id;
    this.period = period;
    this.is_change_construction_infor = is_change_construction_infor;
  }

  static create(
    construction_id: string,
    period: ConstructionPeriod,
    is_change_construction_infor: boolean = false,
  ): Decision {
    return new Decision(
      new DocumentId(v7()),
      construction_id,
      period,
      is_change_construction_infor,
    );
  }

  static reconstitute(
    id: DocumentId,
    construction_id: string,
    period: ConstructionPeriod,
    is_change_construction_infor: boolean = false,
  ): Decision {
    return new Decision(
      id,
      construction_id,
      period,
      is_change_construction_infor,
    );
  }
}
