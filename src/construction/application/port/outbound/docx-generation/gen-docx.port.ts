import { DocxGeneration } from 'src/construction/domain/docx-generation/docx-generation.entity';

export interface IDocxGenerationPort {
  generate(docName: string, docxEntity: DocxGeneration): Promise<Buffer>;
}
