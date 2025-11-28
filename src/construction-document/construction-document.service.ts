import { Injectable } from '@nestjs/common';
import type { Construction } from 'src/common/type/construction.type';
import type { DocGenerator } from 'src/construction-document/abstracts/docGenerator.entity';

@Injectable()
export class ConstructionDocumentService {
  constructor() {}

  genDoc(construction: Construction, docInstance: DocGenerator) {
    docInstance.generate(construction);
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
