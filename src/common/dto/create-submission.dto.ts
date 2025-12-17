import { ConstructionPeriod } from '../type/construction.type';
import { CreateBidPackageDto } from './create-bidPackage.dto';
import { CreateConstructionInforDto } from './create-construction-infor.dto';

export class CreateSubmissionDto {
  no: string;
  level: string;
  date: Date;
  pursuantToDec_TCT: string;
  pursuantToDec_TTMN: string;
  period: ConstructionPeriod;
  constructionInfor: CreateConstructionInforDto;
  bidPackages: CreateBidPackageDto[];
}
