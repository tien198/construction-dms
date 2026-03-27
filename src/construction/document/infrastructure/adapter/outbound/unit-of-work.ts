import { IDocumentRepository } from '../../../application/port/outbound/document.repository.port';
import { IUnitOfWork } from '../../../application/port/outbound/i-unit-of-work.port';

export class UnitOfWork implements IUnitOfWork {
  async begin(): Promise<void> {}

  async commit(): Promise<void> {}

  async rollback(): Promise<void> {}

  docRepo: IDocumentRepository;
}
