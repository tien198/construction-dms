import { Contract } from '../contract.entity';

export interface IContractWriteRepository {
  save(data: Contract): Promise<Contract>;
  update(id: string, data: Contract): Promise<Contract>;
  delete(id: string): Promise<void>;
}
