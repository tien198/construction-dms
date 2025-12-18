import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { ConfigService } from '@nestjs/config';
import { Construction } from 'src/common/type/construction.type';
import { Submission } from 'src/common/type/submission.type';
import { ConstructionRespo } from './construction.respo';
import { DB } from 'src/common/respo/db';

@Injectable()
export class ConstructionService {
  constructor(
    private configService: ConfigService,
    private readonly db: DB,
  ) {}
  // Create
  async createSubmission(submission: Submission) {
    const construcionRespo = new ConstructionRespo(this.db, submission);
  }

  // FindAll
  async findAll() {
    const dataFile = this.configService.get<string>('DATA_FILE');

    const filePath = path.join(process.cwd(), 'public', dataFile ?? '');

    const file = await fs.promises.readFile(filePath, 'utf-8');
    const list = JSON.parse(file) as Construction[];
    return list;
  }

  // FindById
  async findById(id: string) {
    const dataFile = this.configService.get<string>('DATA_FILE');

    const file = await fs.promises.readFile(
      path.join(process.cwd(), 'public', dataFile ?? ''),
      'utf-8',
    );
    const list = JSON.parse(file) as Construction[];

    const construction = list.find((file) => file.id === id);
    if (!construction) throw new Error('Construction not found');

    return construction;
  }

  /*
  update(id: number, construction: Construction) {
    return `This action updates a #${id} construction`;
  }

  remove(id: number) {
    return `This action removes a #${id} construction`;
  }
*/
}
