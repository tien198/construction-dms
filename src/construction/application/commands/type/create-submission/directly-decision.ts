import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';

export interface IDirectlyDecisionCommand {
  id?: string;

  no: string;

  period: ConstructionPeriod;
}
