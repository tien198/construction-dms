import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { ConfigService } from '@nestjs/config';
import { CreateConstructionDto } from 'src/common/dto/create-construction.dto';
import { UpdateConstructionDto } from 'src/common/dto/update-construction.dto';

@Injectable()
export class ConstructionService {
  constructor(private configService: ConfigService) {}
  // Create
  async create(dto: CreateConstructionDto) {
    const doS = new Date(dto.dateOfSigning);
    const rootDir = process.cwd();

    const year = doS.getFullYear();
    const month =
      (doS.getMonth() + 1).toString().length < 2
        ? '0' + (doS.getMonth() + 1)
        : doS.getMonth() + 1;
    const date =
      doS.getDate().toString().length < 2 ? '0' + doS.getDate() : doS.getDate();

    const fileName =
      year + '-' + month + '-' + date + '-' + dto.name.replace(/ /g, '-');

    if (!fs.existsSync(path.join(rootDir, 'public')))
      await fs.promises.mkdir(path.join(rootDir, 'public'), {
        recursive: true,
      });

    const dataFile = this.configService.get<string>('DATA_FILE');
    const filePath = path.join(rootDir, 'public', dataFile ?? '');

    if (!fs.existsSync(filePath)) {
      await fs.promises.writeFile(filePath, JSON.stringify([]));
    }

    const file = await fs.promises.readFile(filePath, 'utf-8');
    const list = JSON.parse(file) as UpdateConstructionDto[];
    const id = Date.now() + '-' + dto.documentNo;

    // sort the packages in Construction by `arrayIndex` in ascending order
    dto.packages.sort((a, b) => a.arrayIndex! - b.arrayIndex!);
    list.push({
      id,
      ...dto,
    });

    await fs.promises.writeFile(filePath, JSON.stringify(list));

    return {
      id,
      message: 'Construction created successfully',
      fileName: fileName,
      ...dto,
    };
  }

  // FindAll
  async findAll() {
    const dataFile = this.configService.get<string>('DATA_FILE');

    const filePath = path.join(process.cwd(), 'public', dataFile ?? '');

    const file = await fs.promises.readFile(filePath, 'utf-8');
    const list = JSON.parse(file) as UpdateConstructionDto[];
    return list;
  }

  // FindById
  async findById(id: string) {
    const dataFile = this.configService.get<string>('DATA_FILE');

    const file = await fs.promises.readFile(
      path.join(process.cwd(), 'public', dataFile ?? ''),
      'utf-8',
    );
    const list = JSON.parse(file) as UpdateConstructionDto[];

    const construction = list.find((file) => file.id === id);
    if (!construction) throw new Error('Construction not found');

    return construction;
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
