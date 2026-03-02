import { Injectable } from '@nestjs/common';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import expressionParser from 'docxtemplater/expressions';

// Builtin file system utilities
import fs from 'fs';
import path from 'path';
import { PrintDocument } from '../domain/type/print-administrative-document.type';
import { ConstructionPeriod } from '../domain/type/construction.type';

@Injectable()
export class PrintService {
  async generate(docName: string, construction: PrintDocument) {
    const content = await fs.promises.readFile(
      path.join('public', 'template', docName),
      'binary',
    );
    // Unzip the content of the file
    const zip = new PizZip(content);

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

    doc.render(construction);

    /*
     * Get the output document and export it as a Node.js buffer
     * This method is available since docxtemplater@3.62.0
     */
    const buf = doc.toBuffer();

    if (!fs.existsSync(path.resolve('gen-documents', construction.name))) {
      fs.mkdirSync(path.resolve('gen-documents', construction.name), {
        recursive: true,
      });
    }
    // Write the Buffer to a file
    await fs.promises.writeFile(
      path.resolve('gen-documents', construction.name, docName),
      buf,
    );
    /*
     * Instead of writing it to a file, you could also
     * let the user download it, store it in a database,
     * on AWS S3, ...
     */
    return buf;
  }
  async getDocumentList() {
    const files = await fs.promises.readdir(path.resolve('public', 'template'));
    return files;
  }

  getDocName(per: ConstructionPeriod): DocNameObj {
    switch (per) {
      case 'KH':
        return {
          submission: '2. Tờ trình phê duyệt KHLCNT.docx',
          decision: '3. QD Phê duyệt KHLCNT.docx',
        };
      case 'TV':
        return {
          submission: '4. Tờ trình phê duyệt KQLCNT TV.docx',
          decision: '5. QD Phê duyệt KQLCNT TV.docx',
        };
      case 'TT':
        return {
          submission: 'tt-submission.docx',
          decision: 'tt-decision.docx',
        };
      case 'BCKTKT':
        return {
          submission: 'bcktkt-submission.docx',
          decision: 'bcktkt-decision.docx',
        };
    }
  }
}

type DocNameObj = {
  submission: string;
  decision: string;
};
