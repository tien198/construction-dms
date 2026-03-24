import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Inject,
} from '@nestjs/common';
import type { IDecisionUseCase } from '../../../domain/port/inbound/decision.use-case';
import { Decision } from '../../../domain/entity/decision.entity';
import { CreateSubmissionDto } from '../dto/create-submission.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('decision')
@Controller('decision')
export class DecisionController {
  constructor(
    @Inject('IDecisionUseCase')
    private readonly decisionUseCase: IDecisionUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new decision' })
  @ApiResponse({ status: 201, description: 'Created successfully.' })
  async create(@Body() data: CreateSubmissionDto): Promise<Decision> {
    return this.decisionUseCase.createDecision(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all decisions' })
  async findAll(): Promise<Decision[]> {
    return this.decisionUseCase.getAllDecisions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a decision by ID' })
  async findOne(@Param('id') id: string): Promise<Decision> {
    return this.decisionUseCase.getDecisionById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a decision' })
  async update(
    @Param('id') id: string,
    @Body() data: CreateSubmissionDto,
  ): Promise<Decision> {
    return this.decisionUseCase.updateDecision(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a decision' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.decisionUseCase.deleteDecision(id);
  }
}
