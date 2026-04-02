export interface IUnitOfWork {
  begin(): Promise<any>;
  commit(client: any): Promise<void>;
  rollback(client: any): Promise<void>;
}
