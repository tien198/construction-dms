import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ConstructionService } from './construction.service';
import { DocumentService } from 'src/document/document.service';
import { ConstructionMapper } from 'src/common/mapper/construction.mapper';
import { ConstructionDocument } from 'src/common/entities/construction.document.format';
import { GenListDto } from './dto/genList.dto';
import { CreateSubmissionDto } from 'src/common/dto/create-submission.dto';
import { SubmissionMapper } from 'src/common/mapper/submission.mapper';

@Controller('construction')
export class ConstructionController {
  constructor(
    private readonly constructionService: ConstructionService,
    private readonly documentService: DocumentService,
    private readonly submissionMapper: SubmissionMapper,
    private readonly constructionMapper: ConstructionMapper,
  ) {}

  @Post()
  initConstruction(@Body() submissionDto: CreateSubmissionDto) {
    const construction = this.submissionMapper.toEntity(submissionDto);

    return this.constructionService.createSubmission(construction);
  }

  @Get()
  findAll() {
    return this.constructionService.findAll();
  }
  @Get('doc-list')
  getDocumentList() {
    return this.documentService.getDocumentList();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.constructionService.findById(id);
  }

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
