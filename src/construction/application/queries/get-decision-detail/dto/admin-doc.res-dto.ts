export class AdminDocResDto {
  id: string;
  no: string;
  level: string;
  date: string;
  pursuant_to_dec_tct: DocRef | null;
  pursuant_to_dec_ttmn: DocRef | null;
}

export interface DocRef {
  id: string;
  no: string;
  date: string;
}
