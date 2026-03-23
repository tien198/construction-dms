import { DomainError } from './domain.error';

export class NotFoundError extends DomainError {
  constructor(entity: string, id: string | number) {
    super(`${entity} with id "${id}" was not found`, 'NOT_FOUND');
  }
}
