import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { CreateConstructionDto } from './dto/create-construction.dto';

@Injectable()
export class ConstructionService {
  create(createConstructorDto: CreateConstructionDto) {
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
      createConstructorDto.name +
      '.json';

    if (!fs.existsSync(path.join(rootDir, 'public')))
      fs.mkdirSync(path.join(rootDir, 'public'), { recursive: true });

    const filePath = path.join(rootDir, 'public', fileName);

    fs.writeFileSync(filePath, JSON.stringify(createConstructorDto));

    return {
      message: 'Construction created successfully',
      ...createConstructorDto,
    };
  }
  /*
  findAll() {
    return `This action returns all construction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} construction`;
  }

  update(id: number, updateConstructionDto: UpdateConstructionDto) {
    return `This action updates a #${id} construction`;
  }

  remove(id: number) {
    return `This action removes a #${id} construction`;
  }
*/
}
