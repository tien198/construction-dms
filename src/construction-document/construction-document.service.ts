import { Injectable } from '@nestjs/common';
import { Doc2 } from './entities/doc2';
import type { Construction } from 'src/common/type/construction.type';

@Injectable()
export class ConstructionDocumentService {
  constructor() {}

  genDoc2(construction: Construction) {
    const doc = new Doc2(construction);
    doc.generate();
  }

  /*
  create(createConstructionDocumentDto: CreateConstructionDocumentDto) {
    return 'This action adds a new constructionDocument';
  }

  findAll() {
    return `This action returns all constructionDocument`;
  }

  findOne(id: number) {
    return `This action returns a #${id} constructionDocument`;
  }

  update(id: number, updateConstructionDocumentDto: UpdateConstructionDocumentDto) {
    return `This action updates a #${id} constructionDocument`;
  }

  remove(id: number) {
    return `This action removes a #${id} constructionDocument`;
  }
    */
}
