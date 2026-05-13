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
  declare representativeName: string;

  @IsString()
  @IsNotEmpty()
  declare representativePosition: string;

  @IsString()
  @IsNotEmpty()
  declare bankAccountNumber: string;

  @IsString()
  @IsNotEmpty()
  declare taxId: string;

  @IsPhoneNumber()
  declare phoneNumber: string;

  @IsEmail()
  declare email: string;
}
