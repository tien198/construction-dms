import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { UpdateBidderCommand } from 'src/bidder/application/command/update-bidder.command';

export class UpdateBidderDto extends UpdateBidderCommand {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  declare name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  declare address: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  declare representativeName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  declare representativePosition: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  declare bankAccountNumber: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  declare taxId: string;

  @IsPhoneNumber()
  @IsOptional()
  declare phoneNumber: string;

  @IsEmail()
  @IsOptional()
  declare email: string;
}
