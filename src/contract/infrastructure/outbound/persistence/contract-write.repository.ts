import { Contract } from 'src/contract/domain/contract.entity';
import { IContractWriteRepository } from 'src/contract/domain/outbound-port/contract-write.repository';

export class ContractWriteRepository implements IContractWriteRepository {
  save(data: Contract): Promise<Contract> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Contract): Promise<Contract> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
