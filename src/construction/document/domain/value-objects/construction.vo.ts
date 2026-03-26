export class ConstructionId {
  constructor(readonly value: string) {}

  static create(val: string) {
    return new ConstructionId(val);
  }
}
