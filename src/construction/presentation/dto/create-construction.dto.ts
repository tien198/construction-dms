import { Construction } from 'src/construction/domain/type/construction.type';
import { ConstructionInforDto } from './create-construction-infor.dto';
import { CreateDecisionDto } from './create-decision.dto';
import { NestedAdministrativeDocumentDto } from './nested-administrative-document.dto';

export class CreateConstructionDto
  implements
    Omit<
      Construction,
      'id' | 'pursuantToDec_TCT' | 'decisions' | 'constructionInfor'
    >
{
  id?: string;
  pursuantToDec_TCT: NestedAdministrativeDocumentDto;
  decisions: CreateDecisionDto[] = [];
  constructionInfor: ConstructionInforDto;
}
