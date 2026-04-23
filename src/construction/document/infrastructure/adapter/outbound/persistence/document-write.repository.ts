import { Inject, Injectable } from '@nestjs/common';

import { PgConnectionService } from 'src/shared/infrastructure/persistence/psql/pg-connection.service';
import { DocumentBaseRepo } from './document-base.repository';
import { IDocumentWriteRepository } from '../../../../application/port/outbound/database/document-write.repository.port';
import { Decision } from 'src/construction/document/domain/decision.entity';
import type { IUnitOfWork } from 'src/construction/document/application/port/outbound/database/i-unit-of-work.port';

@Injectable()
export class DocumentWriteRepository
  extends DocumentBaseRepo
  implements IDocumentWriteRepository
{
  constructor(
    connectionService: PgConnectionService,
    @Inject('IUnitOfWork') uow: IUnitOfWork,
  ) {
    super(connectionService, uow);
  }

  saveDecision(decision: Decision): Promise<Decision> {
    throw new Error('Method not implemented.');
  }
}
