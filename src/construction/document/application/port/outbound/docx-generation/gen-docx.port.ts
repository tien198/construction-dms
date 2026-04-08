import { GeneratedDocx } from 'src/construction/document/domain/docx-generation/generation-doc.entity';

export interface IDocxGenerationPort {
  generate(docName: string, construction: GeneratedDocx): Promise<Buffer>;
}
