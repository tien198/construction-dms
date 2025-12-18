import { Construction } from 'src/construction/type/construction.type';
import { ConstructionInforDto } from './create-construction-infor.dto';
import { DecisionDto } from './create-decision.dto';
import { NestedAdministrativeDocumentDto } from './nested-administrative-document.dto';

export class CreateConstructionDto
  implements
    Omit<Construction, 'pursuantToDec_TCT' | 'decisions' | 'constructionInfor'>
{
  id?: string;
  pursuantToDec_TCT: NestedAdministrativeDocumentDto;
  decisions: DecisionDto[];
  constructionInfor: ConstructionInforDto;
}
