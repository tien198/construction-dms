export interface AdministrativeDocument {
  no: string;
  level: string;
  date: Date;
  pursuantToDec_TCT: NestedAdministrativeDocument;
  pursuantToDec_TTMN?: NestedAdministrativeDocument;
}

export type NestedAdministrativeDocument = Pick<
  AdministrativeDocument,
  'no' | 'level' | 'date'
>;
