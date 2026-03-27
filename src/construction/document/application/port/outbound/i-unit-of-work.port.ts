import { IDocumentRepository } from './document.repository.port';

export interface IUnitOfWork {
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;

  docRepo: IDocumentRepository;
}
