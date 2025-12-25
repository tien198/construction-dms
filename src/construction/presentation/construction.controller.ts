import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { ConstructionService } from '../application/construction.service';
import { ConstructionMapper } from './mapper/construction.dto.mapper';
import { Construction } from '../domain/type/construction.type';
import { SubmissionMapper } from './mapper/submission.dto.mapper';
import { DecisionMapper } from './mapper/decision.dto.mapper';

@Controller('construction')
export class ConstructionController {
  constructor(
    private readonly constructionService: ConstructionService,
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

  @Post('approve/:constructionId/:decisionId/:submissionId')
  approve(
    @Param('constructionId') conId: string,
    @Param('decisionId') decId: string,
    @Param('submissionId') subId: string,
  ): Promise<Construction> {
    return this.constructionService.approve(conId, decId, subId);
  }

  @Post('add-submission/:constructionId/{:decisionId}')
  addSubmission(
    @Body() submissionDto: CreateSubmissionDto,
    @Param('constructionId') conId: string,
    @Param('decisionId') decId?: string,
  ): Promise<Construction> {
    const submission = this.submissionMapper.toEntity(submissionDto);

    if (decId)
      return this.constructionService.addSubmission(conId, submission, decId);
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
  findById(@Param('id') id: string): Promise<Construction> {
    return this.constructionService.findById(id);
  }
  /*
  @Post('gen-doc/:id')
  async generateDocument(@Param('id') id: string, @Body() body: GenListDto) {
    const doc = await this.constructionService.findById(id);
    const formatedDoc = new ConstructionDocument(doc);
    for (const docName of body.list) {
      await this.documentService.generate(docName, formatedDoc);
    }
    return {
      message: 'successfully',
    };
  }
    */

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
