import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { IDocumentSubmissionUseCase } from '../../../application/port/inbound/document-submission.use-case';
import { Decision } from '../../../domain/decision.entity';
import { CreateSubmissionCommand } from '../../../application/commands/create-submission/create-submission.command';

@ApiTags('document')
@Controller('document')
export class DocumentController {
  constructor(
    @Inject('IDocumentSubmissionUseCase')
    private readonly documentSubmissionUseCase: IDocumentSubmissionUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new decision' })
  @ApiResponse({ status: 201, description: 'Created successfully.' })
  async create(
    @Body() data: CreateSubmissionCommand,
  ): Promise<Decision | void> {
    return this.documentSubmissionUseCase.initConstruction(data);
  }

  @Post('add-submission')
  @ApiOperation({ summary: 'Add a new submission for an existing decision' })
  @ApiResponse({ status: 201, description: 'Created successfully.' })
  async addSubmission(
    @Body() data: CreateSubmissionCommand,
  ): Promise<Decision | void> {
    if (data.conId) {
      return this.documentSubmissionUseCase.addSubmissionForNewDecision(
        data.conId,
        data,
      );
    }
    // if exists decision id (directlyDecision.id), add submission for existed decision
    else if (data.directlyDecision.id) {
      return this.documentSubmissionUseCase.addSubmissionForExistedDecision(
        data.directlyDecision.id,
        data,
      );
    }
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
