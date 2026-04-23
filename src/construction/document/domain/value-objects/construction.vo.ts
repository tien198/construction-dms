export class ConstructionId {
  constructor(readonly value: string | null = null) {}

  static create(val: string) {
    return new ConstructionId(val);
  }
}
