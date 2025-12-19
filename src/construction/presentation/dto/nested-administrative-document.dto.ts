import { NestedAdministrativeDocument } from 'src/construction/domain/type/administrative-document. type';

export class NestedAdministrativeDocumentDto
  implements Omit<NestedAdministrativeDocument, 'date'>
{
  no: string;
  level: string;
  date: string;
}
