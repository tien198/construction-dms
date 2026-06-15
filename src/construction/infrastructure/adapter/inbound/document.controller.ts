import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  Param,
  Query,
  StreamableFile,
  Res,
  Put,
  ParseBoolPipe,
} from '@nestjs/common';
import type { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import type { IDocumentSubmissionUseCase } from '../../../application/port/inbound/document-submission.use-case';
import type { IDocumentQueriesUseCase } from 'src/construction/application/port/inbound/document.queries.use-case';
import { CreateSubmissionCommand } from 'src/construction/application/commands/create-submission/create-submission.command';
import { DecisionDetailResDto } from 'src/construction/application/queries/get-decision-detail/get-decision-detail.query';
import { ConstructionResDto } from 'src/construction/application/dto/response/get-constructions.res-dto';
import { DecisionResDto } from 'src/construction/application/dto/response/get-decision.res-dto';
import { ResResult } from 'src/shared/response-result';
import { ConstructionId } from 'src/construction/domain/value-objects/construction.vo';
import {
  DecisionId,
  DocumentId,
} from 'src/construction/domain/value-objects/document.vo';
import { DocxGenerationServiceProvider } from '../nestjs/provider/docx-generation.service.provider';

@ApiTags('document')
@Controller('document')
export class DocumentController {
  constructor(
    @Inject('IDocumentSubmissionUseCase')
    private readonly _documentSubmissionUseCase: IDocumentSubmissionUseCase,
    @Inject('IDocumentQueriesUseCase')
    private readonly _documentQueriesUseCase: IDocumentQueriesUseCase,
    private readonly _docxGenerationService: DocxGenerationServiceProvider,
  ) {}

  @Post('init-construction')
  @ApiOperation({ summary: 'Create a new decision' })
  @ApiResponse({ status: 201, description: 'Created successfully.' })
  async create(@Body() cmd: CreateSubmissionCommand): Promise<ConstructionId> {
    const conId = await this._documentSubmissionUseCase.initConstruction(cmd);
    return conId;
  }

  @Post('add-submission')
  @ApiOperation({ summary: 'Add a new submission for an existing decision' })
  @ApiResponse({ status: 201, description: 'Created successfully.' })
  async addSubmission(
    @Body() cmd: CreateSubmissionCommand,
  ): Promise<DecisionId> {
    // if exists decision id (directlyDecision.id), add submission for existed decision
    if (cmd.directly_decision.id) {
      return this._documentSubmissionUseCase.addSubmissionForExistedDecision(
        cmd,
      );
    } else if (cmd.con_id) {
      return this._documentSubmissionUseCase.addSubmissionForNewDecision(cmd);
    } else {
      throw new Error(
        'Invalid request: either con_id or directly_decision.id must be provided',
      );
    }
  }

  @Put('edit-submission')
  @ApiOperation({ summary: 'Edit a submission' })
  @ApiResponse({ status: 200, description: 'Updated successfully.' })
  async editSubmission(
    @Query('isDecEdit', new ParseBoolPipe({ optional: true }))
    isDecEdit: boolean,
    @Body() cmd: CreateSubmissionCommand,
  ): Promise<DocumentId> {
    const subId = await this._documentSubmissionUseCase.editSubmission({
      cmd,
      isDecEdit: isDecEdit ?? false,
    });
    return subId;
  }

  @Get('constructions-list')
  @ApiOperation({ summary: 'Get constructions list' })
  @ApiResponse({
    status: 200,
    description: 'Returns the list of constructions.',
  })
  async getConstructionsList(): Promise<ConstructionResDto[]> {
    return this._documentQueriesUseCase.getConstructionsList();
  }

  @Get('decision/:constructionId/:period')
  @ApiOperation({ summary: 'Get decision by construction id and period' })
  async findDecisionByPeriod(
    @Param('constructionId') constructionId: string,
    @Param('period') period: string,
  ): Promise<ResResult<DecisionDetailResDto | undefined>> {
    const result = await this._documentQueriesUseCase.getDecisionByPeriod({
      constructionId,
      period,
    });
    return new ResResult(result);
  }

  @Get('decisions/list-of-construction/:conId')
  @ApiOperation({ summary: 'Get decision list of a defined construction' })
  async getDecisionList(
    @Param('conId') conId: string,
  ): Promise<DecisionResDto[]> {
    return this._documentQueriesUseCase.getDecisionListOfConstruction(conId);
  }

  @Get('decisions/tct-list')
  @ApiOperation({ summary: 'Get TCT decisions list' })
  async getTCT_DecisionsList(): Promise<DecisionResDto[]> {
    return this._documentQueriesUseCase.getTCT_DecisionsList();
  }

  // Docx Generation
  @Get('docx/list')
  async getDocumentsList(): Promise<string[]> {
    return this._docxGenerationService.getDocumentsList();
  }

  @Get('docx/generate/:subId')
  async generateDocx(
    @Param('subId') subId: string,
    // type of document, default 'submission'
    @Query('type') type: 'submission' | 'decision' = 'submission',
    // is preview, default false
    @Query('is-preview', new ParseBoolPipe({ optional: true }))
    isPreview: boolean = false,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { buffer, docName } = await this._docxGenerationService.generate(
      subId,
      type,
      isPreview,
    );
    res.set({
      'Access-Control-Expose-Headers': 'Content-Disposition',
    });

    return new StreamableFile(buffer, {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      disposition: `attachment; filename="fall-back.docx"; filename*=UTF-8''${encodeURIComponent(docName)}`,
    });
  }
}
