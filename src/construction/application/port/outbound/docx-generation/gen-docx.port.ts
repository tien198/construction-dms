import { DocxGeneration } from 'src/construction/domain/docx-generation/docx-generation.entity';

export interface IDocxGenerationPort {
  generate(
    submissionId: string,
    docxEntity: DocxGeneration,
    isPreview?: boolean,
  ): Promise<Buffer>;
}
