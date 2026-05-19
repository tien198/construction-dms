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

@Controller('contract')
export class ContractController {
  constructor(
    @Inject('IContractCrudUseCase')
    private readonly _contractService: IContractCrudUseCase,
  ) {}

  @Post()
  async create(@Body() data: CreateContractCommand): Promise<Contract> {
    return this._contractService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateContractCommand,
  ): Promise<Contract> {
    return this._contractService.update(id, data);
  }

  @Get()
  async findAll(): Promise<GetContractQueryResult[]> {
    return this._contractService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<GetContractQueryResult> {
    return this._contractService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this._contractService.delete(id);
  }
}
