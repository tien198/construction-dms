import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ConstructionService } from './construction.service';
import { CreateConstructionDto } from 'src/common/dto/create-construction.dto';
import { DocumentService } from 'src/document/document.service';
import { ConstructionMapper } from 'src/common/mapper/construction..mapper';
import { ConstructionDocument } from 'src/common/entities/construction.document.format';
import { GenListDto } from './dto/genList.dto';

@Controller('construction')
export class ConstructionController {
  constructor(
    private readonly constructionService: ConstructionService,
    private readonly documentService: DocumentService,
    private readonly constructionMapper: ConstructionMapper,
  ) {}

  @Post()
  create(@Body() createConstructionDto: CreateConstructionDto) {
    return this.constructionService.create(createConstructionDto);
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
    const data = await this.constructionService.findById(id);
    const doc = this.constructionMapper.toEntity(data);
    const formatedDoc = new ConstructionDocument(doc);
    for (const docName of body.list) {
      await this.documentService.generate(docName, formatedDoc);
    }
    return 'successfully';
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
