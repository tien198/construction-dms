import { ConstructionImp } from '../entity/construction.entity';
import { DecisionViewModel } from './decison.view-model';

export class ConstructionViewModel extends ConstructionImp {
  id: string;
  decisions: DecisionViewModel[];

  constructor(con: ConstructionViewModel) {
    super(con);
    this.id = con.id;
    this.decisions = con.decisions;
  }
}
