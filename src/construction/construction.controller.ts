import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ConstructionService } from './services/construction.service';
import { SubmissionMapper } from 'src/construction/mapper/submission.mapper';
import { CreateSubmissionDto } from './dto/create-submission.dto';

@Controller('construction')
export class ConstructionController {
  constructor(
    private readonly constructionService: ConstructionService,
    private readonly submissionMapper: SubmissionMapper,
  ) {}

  @Post()
  async initPlan(@Body() submissionDto: CreateSubmissionDto) {
    const submission = this.submissionMapper.toEntity(submissionDto);

    return await this.constructionService.initPlan(submission);
  }

  @Get()
  async findAll() {
    return await this.constructionService.findAll();
  }
  /*
  @Get('doc-list')
  getDocumentList() {
    return this.documentService.getDocumentList();
  }
*/
  @Get(':id')
  findById(@Param('id') id: string) {
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
