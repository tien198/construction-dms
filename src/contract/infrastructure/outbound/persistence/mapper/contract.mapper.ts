import { Contract } from 'src/contract/domain/contract.entity';
import { ContractRow } from '../model/contract.row';
import {
  ContractId,
  ContractNo,
  ContractBidPackageId,
  ContractSigningDate,
} from 'src/contract/domain/value-object/contract.vo';

export class ContractMapper {
  static fromPersistence(row: ContractRow): Contract {
    const entity = new Contract(
      new ContractId(row.id),
      new ContractBidPackageId(row.bid_package_id),
      new ContractNo(row.no),
      new ContractSigningDate(row.signing_date),
    );
    return entity;
  }

  static toPersistence(contract: Contract): ContractRow {
    return {
      id: contract.id!.value,
      bid_package_id: contract.bidPackageId.value,
      no: contract.no.value,
      signing_date: contract.signingDate.value,
    };
  }
}
