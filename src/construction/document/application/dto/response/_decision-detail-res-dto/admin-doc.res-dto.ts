export class AdminDocResDto {
  id: string;
  no: string;
  level: string;
  date: string;
  pursuant_to_dec_tct: DecisionRef | null;
  pursuant_to_dec_ttmn: DecisionRef | null;
}

export interface DecisionRef {
  id: string;
  no: string;
  date: string;
}
