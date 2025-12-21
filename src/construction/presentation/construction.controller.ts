import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { ConstructionService } from '../application/construction.service';
import { ConstructionMapper } from './mapper/construction.mapper';
import { Construction } from '../domain/type/construction.type';
import { SubmissionMapper } from './mapper/submission.mapper';
import { Submission } from '../domain/type/submission.type';

@Controller('construction')
export class ConstructionController {
  constructor(
    private readonly constructionService: ConstructionService,
    private readonly constructionMapper: ConstructionMapper,
    private readonly submissionMapper: SubmissionMapper,
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

  @Post('addSubmission-construction-infor/:constructionId/:decisionId')
  addSubmissionWithConstructionInfor(
    @Body() submissionDto: Required<CreateSubmissionDto>,
    @Param('constructionId') conId: string,
    @Param('decisionId') decId: string,
  ): Promise<Construction> {
    const submission = this.submissionMapper.toEntity(
      submissionDto,
    ) as Required<Submission>;

    return this.constructionService.addSubmission(submission, conId, decId);
  }

  @Post('addSubmission/:constructionId/:decisionId')
  addSubmission(
    @Body() submissionDto: CreateSubmissionDto,
    @Param('constructionId') conId: string,
    @Param('decisionId') decId: string,
  ): Promise<Construction> {
    const submission = this.submissionMapper.toEntity(submissionDto);

    return this.constructionService.addSubmission(submission, conId, decId);
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
