import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.type';
import { AdministrativeDocument } from './administrative-document.entity';
import { ConstructionId } from './value-objects/construction.vo';
import { DecisionId } from './value-objects/document.vo';
import type { IDecision } from './domain-primitive/i-decision';

export class Decision implements IDecision {
  construction_id: ConstructionId;
  is_change_construction_infor?: boolean;
  period: ConstructionPeriod;

  // reference to administrative-document
  document: AdministrativeDocument | DecisionId;

  constructor(
    document: AdministrativeDocument | DecisionId,
    construction_id: ConstructionId,
    period: ConstructionPeriod,
    is_change_construction_infor: boolean = false,
  ) {
    this.construction_id = construction_id;
    this.period = period;
    this.is_change_construction_infor = is_change_construction_infor;

    this.document = document;
  }

  get id(): DecisionId {
    if (this.document instanceof AdministrativeDocument) {
      return this.document.id;
    }
    return this.document;
  }

  static create(
    document: AdministrativeDocument,
    construction_id: ConstructionId,
    period: ConstructionPeriod,
    is_change_construction_infor: boolean = false,
  ): Decision {
    return new Decision(
      document,
      construction_id,
      period,
      is_change_construction_infor,
    );
  }

  static reconstitute(
    document: AdministrativeDocument,
    construction_id: ConstructionId,
    period: ConstructionPeriod,
    is_change_construction_infor: boolean = false,
  ): Decision {
    return new Decision(
      document,
      construction_id,
      period,
      is_change_construction_infor,
    );
  }
}
