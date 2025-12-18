import { NestedAdministrativeDocument } from 'src/construction/type/administrative-document. type';

export class NestedAdministrativeDocumentDto
  implements Omit<NestedAdministrativeDocument, 'date'>
{
  no: string;
  date: string;
}
