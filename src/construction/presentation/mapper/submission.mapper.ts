import { Injectable } from '@nestjs/common';
import { CreateSubmissionDto } from '../../presentation/dto/create-submission.dto';
import { SubmissionImp } from '../../infrastructure/entities/submission.entity';
import { ConstructionInforMapper } from './construction-infor.mapper';
import { NestedAdministrativeDocumentMapper } from './nested-administrative-document.mapper';

@Injectable()
export class SubmissionMapper {
  constructor(
    private readonly constructionInforMapper: ConstructionInforMapper,
    private readonly nestedAdministrativeDocumentMapper: NestedAdministrativeDocumentMapper,
  ) {}

  toEntity(dto: CreateSubmissionDto) {
    const entity = new SubmissionImp();

    entity.no = dto.no;
    entity.level = dto.level;
    entity.date = new Date(dto.date);
    entity.pursuantToDec_TCT = this.nestedAdministrativeDocumentMapper.toEntity(
      dto.pursuantToDec_TCT,
    );
    entity.pursuantToDec_TTMN = dto.pursuantToDec_TTMN
      ? this.nestedAdministrativeDocumentMapper.toEntity(dto.pursuantToDec_TTMN)
      : undefined;
    entity.period = dto.period;

    entity.isApproved = dto.isApproved ?? false;
    entity.constructionInfor = dto.constructionInfor
      ? this.constructionInforMapper.toEntity(dto.constructionInfor)
      : undefined;

    return entity;
  }

  toDto(entity: SubmissionImp) {
    const dto = new CreateSubmissionDto();

    dto.no = entity.no;
    dto.level = entity.level;
    dto.date = entity.date.toISOString();
    dto.pursuantToDec_TCT = this.nestedAdministrativeDocumentMapper.toDto(
      entity.pursuantToDec_TCT,
    );
    dto.pursuantToDec_TTMN = entity.pursuantToDec_TTMN
      ? this.nestedAdministrativeDocumentMapper.toDto(entity.pursuantToDec_TTMN)
      : undefined;
    dto.period = entity.period;

    dto.isApproved = entity.isApproved;
    dto.constructionInfor = entity.constructionInfor
      ? this.constructionInforMapper.toDto(entity.constructionInfor)
      : undefined;

    return dto;
  }
}
