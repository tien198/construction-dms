export interface AdministrativeDocument {
  id: string;
  no: string;
  level: string;
  date: string;
  pursuant_to_dec_tct: NestedDoc | null;
  pursuant_to_dec_ttmn: NestedDoc | null;
}

export interface NestedDoc {
  id: string;
  no: string;
  date: string;
}
