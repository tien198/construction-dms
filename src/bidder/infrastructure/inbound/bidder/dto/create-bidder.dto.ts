import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { CreateBidderCommand } from 'src/bidder/application/command/create-bidder.command';

export class CreateBidderDto extends CreateBidderCommand {
  @IsString()
  @IsNotEmpty()
  declare name: string;

  @IsString()
  @IsNotEmpty()
  declare address: string;

  @IsString()
  @IsNotEmpty()
  declare representative_name: string;

  @IsString()
  @IsNotEmpty()
  declare representative_position: string;

  @IsString()
  @IsNotEmpty()
  declare bank_account_number: string;

  @IsString()
  @IsNotEmpty()
  declare taxId: string;

  @IsPhoneNumber()
  declare phoneNumber: string;

  @IsEmail()
  declare email: string;
}
