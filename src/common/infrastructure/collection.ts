import path from 'path';
import fs from 'fs';

export class Collection<T extends object> {
  constructor(private readonly dataFile: string) {}
  async insertOne(data: T) {
    const { filePath, list } = await this.accessFile<T>();
    list.push(data);

    await fs.promises.writeFile(filePath, JSON.stringify(list));

    return data;
  }

  async findOne(filter: Partial<T>): Promise<T | undefined> {
    const { list } = await this.accessFile<T>();
    const finded = list.find((i) => this.filterFnc(i, filter));
    return finded ? { ...finded } : undefined;
  }

  async find(filter?: object): Promise<T[]> {
    const { list } = await this.accessFile<T>();

    if (!filter) {
      return list;
    }

    const items = list.filter((i) => this.filterFnc(i, filter));
    return [...items];
  }

  async updateOne(filter: Partial<T>, update: T) {
    const { filePath, list } = await this.accessFile<T>();
    const index = list.findIndex((i) => this.filterFnc(i, filter));
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

  private filterFnc(item: object, filter: object) {
    let isMathch = true;
    for (const k in filter) {
      if (!Object.hasOwn(filter, k)) continue;
      if (filter[k] !== item[k]) {
        isMathch = false;
        break;
      }
    }
    return isMathch;
  }
}
