import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { ConfigService } from '@nestjs/config';
import { Construction } from 'src/construction/domain/type/construction.type';
import { Submission } from 'src/construction/domain/type/submission.type';
import { ConstructionRespo } from '../infrastructure/construction.respo';
import { ConstructionImp } from '../domain/entities/construction.entity';
import { DecisionImp } from '../domain/entities/decision.entity';
import { NestedAdministrativeDocument } from '../domain/type/administrative-document. type';

@Injectable()
export class ConstructionService {
  constructor(
    private readonly configService: ConfigService,
    private readonly constructionRespo: ConstructionRespo,
  ) {}
  // Create
  async initPlan(
    submission: Submission,
    directlyDecision: NestedAdministrativeDocument,
  ) {
    const construction = new ConstructionImp();
    const decision = new DecisionImp({
      ...directlyDecision,
      date: submission.date,
      pursuantToDec_TCT: submission.pursuantToDec_TCT,
      period: 'KH',
      submissions: [submission],
    });
    construction.pursuantToDec_TCT = submission.pursuantToDec_TCT;
    construction.decisions.push(decision);
    construction.constructionInfor = submission.constructionInfor;

    return await this.constructionRespo.create(construction);
  }

  // FindAll
  async findAll() {
    const list = await this.constructionRespo.find();
    return list;
  }

  // FindById
  async findById(id: string) {
    const dataFile = this.configService.get<string>('CONSTRUCTIONS_DATA_FILE');

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
