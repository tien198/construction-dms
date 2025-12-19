import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import path from 'path';
import fs from 'fs';

@Injectable()
export class DB {
  constructor(private readonly configService: ConfigService) {}

  async insertOne<T extends object>(data: T) {
    const { filePath, list } = await this.accessFile<T>();
    list.push(data);

    await fs.promises.writeFile(filePath, JSON.stringify(list));

    return data;
  }

  async findOne<T extends object>(filter: T) {
    const { list } = await this.accessFile<T>();
    const item = list.find((i) => this.filterFnc(i, filter));
    return item;
  }

  async find<T extends object>(filter?: T) {
    const { list } = await this.accessFile<T>();

    if (!filter) return list;

    const item = list.filter((i) => this.filterFnc(i, filter));
    return item;
  }

  async updateOne<T extends object>(filter: Partial<T>, update: T) {
    const { filePath, list } = await this.accessFile<T>();
    const index = list.findIndex((i) => this.filterFnc(i, filter));
    if (!index) throw new Error('Not found record');
    list[index] = update;
    await fs.promises.writeFile(filePath, JSON.stringify(list));
    return update;
  }

  // Ultilities
  private async accessFile<T extends object>() {
    const dataFile = this.configService.get<string>('CONSTRUCTIONS_DATA_FILE');
    const dirPath = path.resolve('public');
    const filePath = path.join(dirPath, dataFile ?? '');

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
