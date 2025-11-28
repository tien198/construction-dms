import fs from 'fs';
import { Controller, Post, Param } from '@nestjs/common';
import { ConstructionDocumentService } from './construction-document.service';
import { ConstructionService } from 'src/construction/construction.service';
import { Doc2 } from './entities/doc2.entity';
import { Packer } from 'docx';
import path from 'path';

@Controller('construction-document')
export class ConstructionDocumentController {
  constructor(
    private readonly _constructionDocumentService: ConstructionDocumentService,
    private readonly _constructionService: ConstructionService,
  ) {}
  @Post(':id')
  genDocs(@Param('id') id: string) {
    const construction = this._constructionService.findById(id);

    return construction;
  }

  @Post('doc2/:id')
  async genDoc2(@Param('id') id: string) {
    const construction = await this._constructionService.findById(id);

    const doc2 = this._constructionDocumentService.genDoc(
      construction,
      new Doc2(),
    );
    // 1. Tạo buffer từ Packer (giả sử doc2 là document của bạn)
    const buffer = await Packer.toBuffer(doc2);
    const dirPath = path.join(process.cwd(), 'public', construction.name);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = path.join(dirPath, '2. Tờ trình phê duyệt KHLCNT.doc');
    await fs.promises.writeFile(filePath, buffer);
    // 2. Thiết lập header để trình duyệt hiểu đây là file tải về
    // res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    // res.setHeader(
    //   'Content-Type',
    //   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // );
    // res.setHeader('Content-Length', buffer.length);

    // 4. Gửi Buffer trực tiếp
    return 'success';
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
