import path from 'path';
import fs from 'fs';
import type { Filter } from './type/db.type';

export class Collection<T extends object> {
  constructor(private readonly dataFile: string) {}
  async insertOne(data: T) {
    const { filePath, list } = await this.accessFile<T>();
    list.push(data);

    await fs.promises.writeFile(filePath, JSON.stringify(list));

    return data;
  }

  async findOne(filter: Filter<T>): Promise<T | undefined> {
    const { list } = await this.accessFile<T>();
    const finded = list.find((i) => this.filterFnc(filter, i));
    return finded ? { ...finded } : undefined;
  }

  async find(filter?: Filter<T>): Promise<T[]> {
    const { list } = await this.accessFile<T>();

    if (!filter) {
      return list;
    }

    const items = list.filter((i) => this.filterFnc(filter, i));
    return [...items];
  }

  async updateOne(filter: Filter<T>, update: T) {
    const { filePath, list } = await this.accessFile<T>();
    const index = list.findIndex((i) => this.filterFnc(filter, i));
    if (index < 0) throw new Error('Not found record');
    list[index] = update;
    await fs.promises.writeFile(filePath, JSON.stringify(list));
    return update;
  }

  // Ultilities
  private async accessFile<T>() {
    const dirPath = path.resolve('public');
    const filePath = path.join(dirPath, this.dataFile ?? '');

    if (fs.existsSync(dirPath)) {
      await fs.promises.mkdir(dirPath, {
        recursive: true,
      });
    }

    if (!fs.existsSync(filePath)) {
      await fs.promises.writeFile(filePath, JSON.stringify([]));
    }
    const file = await fs.promises.readFile(filePath, 'utf-8');
    const list = JSON.parse(file) as T[];

    return { filePath, list };
  }

  private filterFnc<T>(filter: Filter<T>, object: T): boolean {
    return Object.entries(filter).every(([fKey, fVal]) =>
      this.isMatchPath(object, fKey, fVal),
    );
  }

  private isMatchPath(obj: any, path: string, value: any): boolean {
    const keys = path.split('.');

    function recur(current: any, idx: number): boolean {
      if (current == null) return false;

      if (idx === keys.length) {
        return current === value;
      }

      const k = keys[idx];
      if (Array.isArray(current)) {
        return current
          .flatMap((item) => recur(item, idx))
          .some((i) => i === true);
      }

      return recur(current[k], idx + 1);
    }

    return recur(obj, 0);
  }
}

/* 
function filterFnc<T>(filter: Filter<T>, object: T): boolean {
  let cursor: any = object;
  // browse each filter key-value pair
  return Object.entries(filter).every(([fKey, fVal]) => {
    const pathArr = fKey.split('.');
    // traverse the object along the path
    for (let i = 0; i < pathArr.length; i++) {
      const isLast = i === pathArr.length - 1;
      const k = pathArr[i];
      if (isLast) {
        return cursor[k] === fVal;
      }
      cursor = cursor[k];
      if (cursor == null) {
        return false;
      }
    }
  });
}
*/
