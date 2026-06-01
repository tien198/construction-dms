import { Inject, Injectable } from '@nestjs/common';
import { DocxGenerationService } from 'src/construction/application/service/docx-generation.service';
import type { IDocxGenerationPort } from 'src/construction/application/port/outbound/docx-generation/gen-docx.port';
import type { IDocumentQueryRepository } from 'src/construction/application/port/outbound/database/document-query.repository.port';

@Injectable()
export class DocxGenerationServiceProvider extends DocxGenerationService {
  constructor(
    @Inject('IDocxGenerationPort')
    docxGeneration: IDocxGenerationPort,
    @Inject('IDocumentQueryRepository')
    documentQueryRepository: IDocumentQueryRepository,
  ) {
    super(docxGeneration, documentQueryRepository);
  }
}
