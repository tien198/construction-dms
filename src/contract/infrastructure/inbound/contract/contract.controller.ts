import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import type { IContractCrudUseCase } from 'src/contract/application/inbound-port/contract.use-case';
import type { CreateContractCommand } from 'src/contract/application/command/create-contract.command';
import type { UpdateContractCommand } from 'src/contract/application/command/update-contract.command';
import type { Contract } from 'src/contract/domain/contract.entity';
import type { GetContractQueryResult } from 'src/contract/application/query/get-contract.result';
import { ResResult } from 'src/shared/response-result';

@Controller('contract')
export class ContractController {
  constructor(
    @Inject('IContractCrudUseCase')
    private readonly _contractService: IContractCrudUseCase,
  ) {}

  @Post()
  async create(
    @Body() data: CreateContractCommand,
  ): Promise<ResResult<Contract>> {
    const contract = await this._contractService.create(data);
    return new ResResult(contract);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateContractCommand,
  ): Promise<ResResult<Contract>> {
    const contract = await this._contractService.update(id, data);
    return new ResResult(contract);
  }

  @Get()
  async findAll(): Promise<ResResult<GetContractQueryResult[]>> {
    const contracts = await this._contractService.findAll();
    return new ResResult(contracts);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
  ): Promise<ResResult<GetContractQueryResult>> {
    const contract = await this._contractService.findById(id);
    return new ResResult(contract);
  }

  @Get('query/bid-package/:bidPackageId')
  async findByBidPackageId(
    @Param('bidPackageId') bidPackageId: string,
  ): Promise<ResResult<GetContractQueryResult>> {
    const contract =
      await this._contractService.findByBidPackageId(bidPackageId);
    return new ResResult(contract);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResResult<void>> {
    await this._contractService.delete(id);
    return new ResResult(undefined);
  }
}
