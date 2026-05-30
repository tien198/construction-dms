import { Inject, Injectable } from '@nestjs/common';
import { DocxGenerationService } from 'src/construction/application/service/docx-generation.service';
import type { IDocxGenerationPort } from 'src/construction/application/port/outbound/docx-generation/gen-docx.port';

@Injectable()
export class DocxGenerationServiceProvider extends DocxGenerationService {
  constructor(
    @Inject('IDocxGenerationPort')
    docxGeneration: IDocxGenerationPort,
  ) {
    super(docxGeneration);
  }
}
