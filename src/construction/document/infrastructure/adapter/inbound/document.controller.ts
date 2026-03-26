import { Controller, Post, Body, Inject } from '@nestjs/common';
import type { IDocumentUseCase } from '../../../domain/port/inbound/document.use-case';
import { Decision } from '../../../domain/entity/decision.entity';
import { CreateSubmissionCommand } from '../../../application/command/create-submission.command';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('document')
@Controller('document')
export class DocumentController {
  constructor(
    @Inject('IDocumentUseCase')
    private readonly documentUseCase: IDocumentUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new decision' })
  @ApiResponse({ status: 201, description: 'Created successfully.' })
  async create(@Body() data: CreateSubmissionCommand): Promise<Decision> {
    return this.documentUseCase.initConstruction(data);
  }
  /*
  @Get()
  @ApiOperation({ summary: 'Get all decisions' })
  async findAll(): Promise<Decision[]> {
    return this.documentUseCase.getAllDecisions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a decision by ID' })
  async findOne(@Param('id') id: string): Promise<Decision> {
    return this.documentUseCase.getDecisionById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a decision' })
  async update(
    @Param('id') id: string,
    @Body() data: CreateSubmissionCommand,
  ): Promise<Decision> {
    return this.documentUseCase.updateDecision(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a decision' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.documentUseCase.deleteDecision(id);
  }
    */
}
