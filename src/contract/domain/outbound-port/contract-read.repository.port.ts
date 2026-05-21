import { GetContractQueryResult } from 'src/contract/application/query/get-contract.result';
import { Contract } from '../contract.entity';

export interface IContractReadRepository {
  findAll(): Promise<GetContractQueryResult[]>;
  findById(id: string): Promise<GetContractQueryResult>;

  findByIdAndConvertToDomain(id: string): Promise<Contract>;
}
