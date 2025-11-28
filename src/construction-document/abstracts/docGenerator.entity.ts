import { Construction } from '../../common/type/construction.type';

export abstract class DocGenerator {
  abstract generate(construction: Construction): any;
}
