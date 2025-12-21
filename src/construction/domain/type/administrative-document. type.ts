export interface AdministrativeDocument {
  id: string;
  no: string;
  level: string;
  date: Date;
  pursuantToDec_TCT: NestedAdministrativeDocument;
  pursuantToDec_TTMN?: NestedAdministrativeDocument;
}

export type NestedAdministrativeDocument = Pick<
  AdministrativeDocument,
  'id' | 'no' | 'level' | 'date'
>;
