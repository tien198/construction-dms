import { NestedAdministrativeDocument } from 'src/construction/domain/type/administrative-document. type';

export class NestedAdministrativeDocumentDto
  implements Partial<Omit<NestedAdministrativeDocument, 'date'>>
{
  id?: string;
  no: string;
  level: string;
  date: string;
}
