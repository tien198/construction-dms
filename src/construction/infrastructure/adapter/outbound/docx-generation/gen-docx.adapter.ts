import fs from 'fs';
import path from 'path';

import { Injectable } from '@nestjs/common';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import expressionParser from 'docxtemplater/expressions';

import { DocxGeneration } from 'src/construction/domain/docx-generation/docx-generation.entity';
import { IDocxGenerationPort } from 'src/construction/application/port/outbound/docx-generation/gen-docx.port';

@Injectable()
export class DocxGenerationAdapter implements IDocxGenerationPort {
  async generate(docName: string, docxEntity: DocxGeneration) {
    const templatePath = path.resolve('public', 'template', docName);
    const templateBuffer = await fs.promises.readFile(templatePath, 'binary');

    // Unzip the templateBuffer
    const zip = new PizZip(templateBuffer);

    /*
     * Parse the template.
     * This function throws an error if the template is invalid,
     * for example, if the template is "Hello {user" (missing closing tag)
     */
    const parser = expressionParser.configure({
      filters: {}, // optional: define your custom filters here
    });

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      parser,
    });

    /*
     * Render the document : Replaces :
     * - {first_name} with John
     * - {last_name} with Doe,
     * ...
     */

    doc.render(docxEntity);

    /*
     * Get the output document and export it as a Node.js buffer
     * This method is available since docxtemplater@3.62.0
     */
    const buf = doc.toBuffer();

    if (!fs.existsSync(path.resolve('gen-documents', docxEntity.name))) {
      fs.mkdirSync(path.resolve('gen-documents', docxEntity.name), {
        recursive: true,
      });
    }
    // Write the Buffer to a file
    await fs.promises.writeFile(
      path.resolve('gen-documents', docxEntity.name, docName),
      buf,
    );
    /*
     * Instead of writing it to a file, you could also
     * let the user download it, store it in a database,
     * on AWS S3, ...
     */
    return buf;
  }
}
