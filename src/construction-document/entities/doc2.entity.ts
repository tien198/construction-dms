import { Document, Paragraph, TextRun } from 'docx';
import { Construction } from 'src/common/type/construction.type';
import { DocGenerator } from 'src/construction-document/abstracts/docGenerator.entity';

export class Doc2 extends DocGenerator {
  generate(construction: Construction) {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun(construction.name),
                new TextRun({
                  text: 'Foo Bar',
                  bold: true,
                }),
                new TextRun({
                  text: '\tGithub is the best',
                  bold: true,
                }),
              ],
            }),
          ],
        },
      ],
    });
    return doc;
  }
}
