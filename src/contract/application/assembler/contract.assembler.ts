import { Contract } from 'src/contract/domain/contract.entity';
import { CreateContractCommand } from '../command/create-contract.command';
import {
  ContractBidPackageId,
  ContractNo,
  ContractSigningDate,
} from 'src/contract/domain/value-object/contract.vo';

export class ContractAssembler {
  static fromCreateCmd(cmd: CreateContractCommand) {
    return new Contract(
      null,
      new ContractBidPackageId(cmd.bid_package_id),
      new ContractNo(cmd.no),
      new ContractSigningDate(cmd.signing_date),
    );
  }
}
