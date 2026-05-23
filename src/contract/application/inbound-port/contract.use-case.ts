import { Contract } from 'src/contract/domain/contract.entity';
import type { CreateContractCommand } from '../command/create-contract.command';
import type { UpdateContractCommand } from '../command/update-contract.command';
import type { GetContractQueryResult } from '../query/get-contract.result';

export interface IContractCrudUseCase {
  create(data: CreateContractCommand): Promise<Contract>;
  update(id: string, data: UpdateContractCommand): Promise<Contract>;
  // Query
  findAll(): Promise<GetContractQueryResult[]>;
  findById(id: string): Promise<GetContractQueryResult>;
  findByBidPackageId(bidPackageId: string): Promise<GetContractQueryResult>;
  delete(id: string): Promise<void>;
}
