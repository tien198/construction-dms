export class AdminDocResDto {
  id: string;
  no: string;
  level: string;
  date: string;
  pursuant_to_dec_tct: NestedDocResDto | null;
  pursuant_to_dec_ttmn: NestedDocResDto | null;
}

export interface NestedDocResDto {
  id: string;
  no: string;
  date: string;
}
