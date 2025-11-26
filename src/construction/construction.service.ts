import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { CreateConstructionDto } from './dto/create-construction.dto';

@Injectable()
export class ConstructionService {
  create(createConstructorDto: CreateConstructionDto) {
    const DoS = new Date(createConstructorDto.dateOfSigning);
    const rootDir = process.cwd();

    const fileName =
      DoS.getFullYear() +
      '-' +
      ((DoS.getMonth() + 1).toString().length < 2
        ? '0' + (DoS.getMonth() + 1)
        : DoS.getMonth() + 1) +
      '-' +
      (DoS.getDate().toString().length < 2
        ? '0' + DoS.getDate()
        : DoS.getDate()) +
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
