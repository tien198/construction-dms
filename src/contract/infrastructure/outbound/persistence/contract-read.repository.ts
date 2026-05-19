import { GetContractQueryResult } from 'src/contract/application/query/get-contract.result';
import { IContractReadRepository } from 'src/contract/domain/outbound-port/contract-read.repository';

export class ContractReadRepository implements IContractReadRepository {
  async findAll(): Promise<GetContractQueryResult[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<GetContractQueryResult> {
    throw new Error('Method not implemented.');
  }
}
