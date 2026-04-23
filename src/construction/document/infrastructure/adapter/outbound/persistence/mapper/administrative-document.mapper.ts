import { AdministrativeDocument } from 'src/construction/document/domain/administrative-document.entity';
import { AdministrativeDocumentRow } from '../model/administrative-document.row';

export class AdministrativeDocumentMapper {
  static toPersistence(
    document: AdministrativeDocument,
  ): AdministrativeDocumentRow {
    const entity = new AdministrativeDocumentRow();
    entity.id = document.id.value!;
    entity.no = document.no.value;
    entity.level = document.level;
    entity.date = document.date;
    entity.pursuant_to_dec_tct_id = document.pursuant_to_dec_tct_id.dec_id;
    entity.pursuant_to_dec_ttmn_id =
      document.pursuant_to_dec_ttmn_id?.dec_id ?? null;

    return entity;
  }
}
