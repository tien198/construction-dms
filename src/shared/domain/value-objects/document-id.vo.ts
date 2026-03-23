import { randomUUID } from 'crypto';

export class DocumentId {
  private readonly _value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('DocumentId cannot be empty');
    }
    this._value = value.trim();
  }

  get value(): string {
    return this._value;
  }

  equals(other: DocumentId): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }

  static generate(): DocumentId {
    return new DocumentId(randomUUID());
  }

  static fromString(value: string): DocumentId {
    return new DocumentId(value);
  }
}
