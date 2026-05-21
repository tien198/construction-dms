import { Inject, Injectable } from '@nestjs/common';
import { ContractService } from 'src/contract/application/service/contract.service';
import type { IContractReadRepository } from 'src/contract/domain/outbound-port/contract-read.repository.port';
import type { IContractWriteRepository } from 'src/contract/domain/outbound-port/contract-write.repository.port';

@Injectable()
export class ContractServiceProvider extends ContractService {
  constructor(
    @Inject('IContractReadRepository')
    contractReadRepository: IContractReadRepository,
    @Inject('IContractWriteRepository')
    contractWriteRepository: IContractWriteRepository,
  ) {
    super(contractReadRepository, contractWriteRepository);
  }
}
