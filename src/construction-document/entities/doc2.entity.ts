import { Construction } from 'src/common/type/construction.type';
import { DocGenerator } from 'src/construction-document/abstracts/docGenerator.entity';

export class Doc2 extends DocGenerator {
  generate(construction: Construction) {
    construction.budget = 123;
  }
}
