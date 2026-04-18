export class ConstructionId {
  constructor(readonly value: string | null) {}

  static create(val: string) {
    return new ConstructionId(val);
  }
}
