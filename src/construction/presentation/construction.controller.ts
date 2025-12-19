import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { SubmissionMapper } from './mapper/submission.mapper';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { NestedAdministrativeDocumentMapper } from './mapper/nested-administrative-document.mapper';
import { ConstructionService } from '../application/construction.service';
import { ConstructionMapper } from './mapper/construction.mapper';

@Controller('construction')
export class ConstructionController {
  constructor(
    private readonly constructionService: ConstructionService,
    private readonly submissionMapper: SubmissionMapper,
    private readonly nestedAdministrativeDocumentMapper: NestedAdministrativeDocumentMapper,
    private readonly constructionMapper: ConstructionMapper,
  ) {}

  @Post()
  async initPlan(@Body() submissionDto: CreateSubmissionDto) {
    const constructionDto =
      this.constructionMapper.fromSubmissionDto(submissionDto);
    const construction = this.constructionMapper.toEntity(constructionDto);

    return await this.constructionService.initPlan(construction);
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
