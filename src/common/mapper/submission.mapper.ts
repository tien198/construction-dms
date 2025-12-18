import { Injectable } from '@nestjs/common';
import { CreateSubmissionDto } from '../dto/create-submission.dto';
import { SubmissionImp } from '../entities/submission.entity';
import { ConstructionInforMapper } from './construction-infor.mapper';

@Injectable()
export class SubmissionMapper {
  constructor(
    private readonly constructionInforMapper: ConstructionInforMapper,
  ) {}

  toEntity(dto: CreateSubmissionDto) {
    const entity = new SubmissionImp();

    entity.no = dto.no;
    entity.level = dto.level;
    entity.date = new Date(dto.date);
    entity.pursuantToDec_TCT = dto.pursuantToDec_TCT;
    entity.pursuantToDec_TTMN = dto.pursuantToDec_TTMN;
    entity.period = dto.period;

    entity.constructionInfor = this.constructionInforMapper.toEntity(
      dto.constructionInfor,
    );

    return entity;
  }

  toDto(entity: SubmissionImp) {
    const dto = new CreateSubmissionDto();

    dto.no = entity.no;
    dto.level = entity.level;
    dto.date = entity.date.toISOString();
    dto.pursuantToDec_TCT = entity.pursuantToDec_TCT;
    dto.pursuantToDec_TTMN = entity.pursuantToDec_TTMN;
    dto.period = entity.period;

    dto.constructionInfor = this.constructionInforMapper.toDto(
      entity.constructionInfor,
    );

    return dto;
  }
}
