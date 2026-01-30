import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  StreamableFile,
} from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { ConstructionService } from '../application/construction.service';
import { ConstructionMapper } from './mapper/construction.dto.mapper';
import { Construction } from '../domain/type/construction.type';
import { SubmissionMapper } from './mapper/submission.dto.mapper';
import { DecisionMapper } from './mapper/decision.dto.mapper';
import { PrintService } from '../application/print.service';
import { PrintDocumentImp } from '../domain/entity/print-document.entity';

@Controller('construction')
export class ConstructionController {
  constructor(
    private readonly constructionService: ConstructionService,
    private readonly printService: PrintService,
    private readonly constructionMapper: ConstructionMapper,
    private readonly submissionMapper: SubmissionMapper,
    private readonly decisionMapper: DecisionMapper,
  ) {}

  @Post()
  initPlan(
    @Body() submissionDto: Required<CreateSubmissionDto>,
  ): Promise<Construction> {
    const constructionDto =
      this.constructionMapper.initFromSubmissionDto(submissionDto);
    const construction = this.constructionMapper.toEntity(constructionDto);

    return this.constructionService.initPlan(construction);
  }

  @Post('approve/:constructionId/:decisionId')
  approve(
    @Param('constructionId') conId: string,
    @Param('decisionId') decId: string,
  ): Promise<Construction> {
    return this.constructionService.approve(conId, decId);
  }

  // @Post('add-submission/:construction-id/{:decisionId}')
  @Post('add-submission/construction-id')
  addSubmission(
    @Param('construction-id') conId: string,
    @Body() submissionDto: CreateSubmissionDto,
  ): Promise<Construction> {
    const submission = this.submissionMapper.toEntity(submissionDto);

    if (submissionDto.directlyDecision?.id)
      return this.constructionService.addSubmission(
        conId,
        submission,
        submissionDto.directlyDecision.id,
      );
    else {
      const decDto = this.decisionMapper.fromSubmissionDto(submissionDto);
      const decision = this.decisionMapper.toEntity(decDto);
      return this.constructionService.addSubmission(
        conId,
        submission,
        decision,
      );
    }
  }

  @Get()
  findAll(): Promise<Construction[]> {
    return this.constructionService.findAll();
  }
  /*
  @Get('doc-list')
  getDocumentList() {
    return this.documentService.getDocumentList();
  }
*/
  @Get(':id')
  findById(@Param('id') id: string): Promise<Construction | undefined> {
    return this.constructionService.findById(id);
  }

  // find decision by period
  @Get('find-dec-by-per/:consId/:period')
  async findDecisionByPeriod(
    @Param('consId') conId: string,
    @Param('period') period: string,
  ) {
    return this.constructionService.findDecisionByPeriod(conId, period);
  }

  @Get('find-dec/:decId')
  async findDecision(@Param('decId') decId: string) {
    const dec = await this.constructionService.findDecision(decId);
    return dec;
  }

  @Post('gen-decision')
  async decGen(
    @Body()
    doc: {
      decId: string;
      conId: string;
      period: string;
    },
  ) {
    const dec = await this.constructionService.findDecision(doc.decId);
    if (!dec) {
      throw new Error('Not found Decision with id: ' + doc.decId);
    }
    const decPrint = new PrintDocumentImp(
      dec,
      dec.submission.constructionInfor,
    );

    // create a helper function to convert 'period' to 'document name'
    // ---
    // --
    // -
    const buf = await this.printService.generate(doc.period, decPrint);

    return new StreamableFile(buf);
  }

  @Post('gen-submission')
  async subGen(@Body() doc: { period: string; decId: string }) {
    const dec = await this.constructionService.findDecision(doc.decId);
    if (!dec) {
      throw new Error('Not found Decision with id: ' + doc.decId);
    }
    const subPrint = new PrintDocumentImp(
      dec.submission,
      dec.submission.constructionInfor,
    );
    const buf = await this.printService.generate(doc.period, subPrint);

    return new StreamableFile(buf, {
      disposition: `attachment; filename=${doc.period}`,
    });
  }

  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConstructionDto: UpdateConstructionDto) {
    return this.constructionService.update(+id, updateConstructionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.constructionService.remove(+id);
  }
*/
}
