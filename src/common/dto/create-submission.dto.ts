import { ConstructionPeriod } from '../type/construction.type';
import { Submission } from '../type/submission.type';
import { CreateBidPackageDto } from './create-bidPackage.dto';
import { CreateConstructionInforDto } from './create-construction-infor.dto';

export class CreateSubmissionDto
  implements Omit<Submission, 'date' | 'constructionInfor'>
{
  no: string;
  level: string;
  date: string;
  pursuantToDec_TCT: string;
  pursuantToDec_TTMN: string;
  period: ConstructionPeriod;
  constructionInfor: CreateConstructionInforDto;
  bidPackages: CreateBidPackageDto[];
}
