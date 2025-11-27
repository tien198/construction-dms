import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { CreateConstructionDto } from './dto/create-construction.dto';

@Injectable()
export class ConstructionService {
  // Create
  async create(createConstructorDto: CreateConstructionDto) {
    const doS = new Date(createConstructorDto.dateOfSigning);
    const rootDir = process.cwd();

    const year = doS.getFullYear();
    const month =
      (doS.getMonth() + 1).toString().length < 2
        ? '0' + (doS.getMonth() + 1)
        : doS.getMonth() + 1;
    const date =
      doS.getDate().toString().length < 2 ? '0' + doS.getDate() : doS.getDate();

    const fileName =
      year +
      '-' +
      month +
      '-' +
      date +
      '-' +
      createConstructorDto.name.replace(/ /g, '-') +
      '.json';

    if (!fs.existsSync(path.join(rootDir, 'public')))
      await fs.promises.mkdir(path.join(rootDir, 'public'), {
        recursive: true,
      });

    const filePath = path.join(rootDir, 'public', fileName);

    await fs.promises.writeFile(filePath, JSON.stringify(createConstructorDto));

    return {
      message: 'Construction created successfully',
      fileName: fileName,
      ...createConstructorDto,
    };
  }

  // FindAll
  async findAll() {
    const files = await fs.promises.readdir(path.join(process.cwd(), 'public'));

    return files;
  }

  // FindById
  async findById(id: string) {
    const files = await fs.promises.readdir(path.join(process.cwd(), 'public'));
    const fileName = files.find((file) => file.includes(id));

    if (!fileName) {
      throw new Error('File not found');
    }

    const file = await fs.promises.readFile(
      path.join(process.cwd(), 'public', fileName),
      'utf-8',
    );

    return file;
  }

  /*
  update(id: number, updateConstructionDto: UpdateConstructionDto) {
    return `This action updates a #${id} construction`;
  }

  remove(id: number) {
    return `This action removes a #${id} construction`;
  }
*/
}
