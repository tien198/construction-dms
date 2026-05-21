import { Module } from '@nestjs/common';
import { ContractController } from '../inbound/contract/contract.controller';
import { ContractServiceProvider } from './provider/contract.service';
import { ContractReadRepository } from '../outbound/persistence/contract-read.repository';
import { ContractWriteRepository } from '../outbound/persistence/contract-write.repository';

@Module({
  imports: [],
  controllers: [ContractController],
  providers: [
    {
      provide: 'IContractCrudUseCase',
      useClass: ContractServiceProvider,
    },
    {
      provide: 'IContractReadRepository',
      useClass: ContractReadRepository,
    },
    {
      provide: 'IContractWriteRepository',
      useClass: ContractWriteRepository,
    },
  ],
  exports: ['IContractCrudUseCase'],
})
export class ContractModule {}
