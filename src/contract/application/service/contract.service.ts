import { IContractCrudUseCase } from 'src/contract/application/inbound-port/contract.use-case';
import { IContractReadRepository } from 'src/contract/domain/outbound-port/contract-read.repository.port';
import { IContractWriteRepository } from 'src/contract/domain/outbound-port/contract-write.repository.port';
import { CreateContractCommand } from '../command/create-contract.command';
import { UpdateContractCommand } from '../command/update-contract.command';
import { GetContractQueryResult } from '../query/get-contract.result';
import { ContractAssembler } from '../assembler/contract.assembler';
import { Contract } from 'src/contract/domain/contract.entity';

export class ContractService implements IContractCrudUseCase {
  constructor(
    private readonly _contractReadRepository: IContractReadRepository,
    private readonly _contractWriteRepository: IContractWriteRepository,
  ) {}

  async create(data: CreateContractCommand): Promise<Contract> {
    const contract = ContractAssembler.fromCreateCmd(data);
    return await this._contractWriteRepository.save(contract);
  }

  async update(id: string, data: UpdateContractCommand): Promise<Contract> {
    const existingContract =
      await this._contractReadRepository.findByIdAndConvertToDomain(id);
    if (!existingContract) {
      throw new Error('Contract not found');
    }
    existingContract.update(data);
    return await this._contractWriteRepository.update(id, existingContract);
  }

  async findAll(): Promise<GetContractQueryResult[]> {
    return await this._contractReadRepository.findAll();
  }

  async findById(id: string): Promise<GetContractQueryResult> {
    return await this._contractReadRepository.findById(id);
  }

  async findByBidPackageId(
    bidPackageId: string,
  ): Promise<GetContractQueryResult> {
    return await this._contractReadRepository.findByBidPackageId(bidPackageId);
  }

  async delete(id: string): Promise<void> {
    return await this._contractWriteRepository.delete(id);
  }
}
