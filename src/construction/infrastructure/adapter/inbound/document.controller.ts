import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  Param,
  Query,
  Header,
  StreamableFile,
  Res,
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
import { DecisionId } from 'src/construction/domain/value-objects/document.vo';
import { DocxGenerationServiceProvider } from '../nestjs/provider/docx-generation.service.provider';
import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';

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
  async create(@Body() data: CreateSubmissionCommand): Promise<ConstructionId> {
    const constructionId =
      await this._documentSubmissionUseCase.initConstruction(data);
    return constructionId;
  }

  @Post('add-submission')
  @ApiOperation({ summary: 'Add a new submission for an existing decision' })
  @ApiResponse({ status: 201, description: 'Created successfully.' })
  async addSubmission(
    @Body() data: CreateSubmissionCommand,
  ): Promise<DecisionId> {
    if (data.con_id) {
      return this._documentSubmissionUseCase.addSubmissionForNewDecision(
        data.con_id,
        data,
      );
    }
    // if exists decision id (directlyDecision.id), add submission for existed decision
    else if (data.directly_decision.id) {
      return this._documentSubmissionUseCase.addSubmissionForExistedDecision(
        data.directly_decision.id,
        data,
      );
    } else {
      throw new Error(
        'Invalid request: either con_id or directly_decision.id must be provided',
      );
    }
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
    @Res({ passthrough: true }) res: Response,
  ) {
    const { buffer, docName } = await this._docxGenerationService.generate(
      subId,
      type,
    );
    res.set({
      'Access-Control-Expose-Headers': 'Content-Disposition',
    });

    return new StreamableFile(buffer, {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      disposition: `attachment; filename="fall-back.docx"; filename*=UTF-8''${encodeURIComponent(docName)}`,
    });
  }

  /*
  @Post('gen-decision')
  @Header('Access-Control-Expose-Headers', 'Content-Disposition')
  async decGen(
    @Body()
    doc: {
      decId: string;
    },
  ) {
    const dec = await this.constructionService.findDecision(doc.decId);
    if (!dec) {
      throw new Error('Not found Decision with id: ' + doc.decId);
    }
    const decPrint = new PrintDecisionImp(dec);

    const docName = this.printService.getDocName(dec.period);
    const buf = await this.printService.generate(docName.decision, decPrint);

    const name = docName.decision;
    return new StreamableFile(buf, {
      disposition: `attachment; filename*=UTF-8''${encodeURIComponent(name)}`,
    });
  }

  @Post('gen-submission')
  @Header('Access-Control-Expose-Headers', 'Content-Disposition')
  async subGen(@Body() doc: { decId: string }) {
    const dec = await this.constructionService.findDecision(doc.decId);
    if (!dec) {
      throw new Error('Not found Decision with id: ' + doc.decId);
    }
    const subPrint = new PrintSubmissionImp(dec.submission);
    const docName = this.printService.getDocName(dec.period);
    const buf = await this.printService.generate(docName.submission, subPrint);
    const name = docName.submission;
    return new StreamableFile(buf, {
      disposition: `attachment; filename*=UTF-8''${encodeURIComponent(name)}`,
    });
  }
  */
}
