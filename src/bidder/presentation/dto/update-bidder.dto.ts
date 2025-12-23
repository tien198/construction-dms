import { PartialType } from '@nestjs/mapped-types';
import { CreateBidderDto } from './create-bidder.dto';
import { Bidder } from 'src/bidder/domain/type/bidder.type';

export class UpdateBidderDto
  extends PartialType(CreateBidderDto)
  implements Partial<Bidder>
{
  id: string;
}
