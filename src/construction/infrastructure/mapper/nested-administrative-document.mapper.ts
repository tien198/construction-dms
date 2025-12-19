import { Injectable } from '@nestjs/common';
import { NestedAdministrativeDocument } from '../../domain/type/administrative-document. type';
import { NestedAdministrativeDocumentDto } from 'src/construction/domain/dto/nested-administrative-document.dto';

@Injectable()
export class NestedAdministrativeDocumentMapper {
  toEntity(dto: NestedAdministrativeDocumentDto) {
    const entity: NestedAdministrativeDocument = {
      no: dto.no,
      date: new Date(dto.date),
    };
    return entity;
  }

  toDto(entity: NestedAdministrativeDocument) {
    const dto: NestedAdministrativeDocumentDto = {
      no: entity.no,
      date: entity.date.toISOString(),
    };
    return dto;
  }
}
