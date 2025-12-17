import { ConstructionPeriod } from '../type/construction.type';
import { CreateBidPackageDto } from './create-bidPackage.dto';

export class CreateConstructionInforDto {
  name: string;
  existingConditionOfTheStructure: string;
  repairScope: string;

  packages: CreateBidPackageDto[];
  packagesAmount: number;
  period: ConstructionPeriod;
}
