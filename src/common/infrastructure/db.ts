import { Injectable } from '@nestjs/common';
import { Collection } from './collection';

@Injectable()
export class DB {
  constructor() {}
  collection<T extends object>(dataFile: string) {
    return new Collection<T>(dataFile);
  }
}
