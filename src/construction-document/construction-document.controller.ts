import { Controller, Post, Param } from '@nestjs/common';
import { ConstructionDocumentService } from './construction-document.service';
import { ConstructionService } from 'src/construction/construction.service';

@Controller('construction-document')
export class ConstructionDocumentController {
  constructor(
    private readonly constructionDocumentService: ConstructionDocumentService,
    private readonly constructionService: ConstructionService,
  ) {}
  @Post(':id')
  genDocs(@Param('id') id: string) {
    const construction = this.constructionService.findById(id);

    return construction;
  }

  /*
  @Post()
  create(@Body() createConstructionDocumentDto: CreateConstructionDocumentDto) {
    return this.constructionDocumentService.create(
      createConstructionDocumentDto,
    );
  }

  @Get()
  findAll() {
    return this.constructionDocumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.constructionDocumentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConstructionDocumentDto: UpdateConstructionDocumentDto,
  ) {
    return this.constructionDocumentService.update(
      +id,
      updateConstructionDocumentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.constructionDocumentService.remove(+id);
  }
    */
}
