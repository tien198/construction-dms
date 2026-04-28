import { Controller, Post, Body, Inject, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import type { IDocumentSubmissionUseCase } from '../../../application/port/inbound/document-submission.use-case';
import type { IDocumentQueriesUseCase } from 'src/construction/application/port/inbound/document.queries.use-case';
import { Decision } from 'src/construction/domain/document/decision.entity';
import { CreateSubmissionCommand } from 'src/construction/application/commands/create-submission/create-submission.command';
import { DecisionDetailResDto } from 'src/construction/application/dto/response/get-decision-detail.res-dto';
import { ConstructionResDto } from 'src/construction/application/dto/response/get-constructions.res-dto';
import { DecisionResDto } from 'src/construction/application/dto/response/get-decision.res-dto';
import { ResResult } from 'src/shared/response-result';
import { Construction } from 'src/construction/domain/construction/construction.entity';

@ApiTags('document')
@Controller('document')
export class DocumentController {
  constructor(
    @Inject('IDocumentSubmissionUseCase')
    private readonly _documentSubmissionUseCase: IDocumentSubmissionUseCase,
    @Inject('IDocumentQueriesUseCase')
    private readonly _documentQueriesUseCase: IDocumentQueriesUseCase,
  ) {}

  @Post('init-construction')
  @ApiOperation({ summary: 'Create a new decision' })
  @ApiResponse({ status: 201, description: 'Created successfully.' })
  async create(
    @Body() data: CreateSubmissionCommand,
  ): Promise<Construction | void> {
    return this._documentSubmissionUseCase.initConstruction(data);
  }

  @Post('add-submission')
  @ApiOperation({ summary: 'Add a new submission for an existing decision' })
  @ApiResponse({ status: 201, description: 'Created successfully.' })
  async addSubmission(
    @Body() data: CreateSubmissionCommand,
  ): Promise<Decision | void> {
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
    const result = await this._documentQueriesUseCase.getDecision({
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
}
