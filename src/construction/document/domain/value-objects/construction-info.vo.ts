export class ConstructionInfoId {
  constructor(readonly value: string) {}

  static create(val: string) {
    return new ConstructionInfoId(val);
  }
}

export class ConstructionName {
  constructor(readonly value: string) {}

  static create(val: string) {
    return new ConstructionName(val);
  }
}

export class SourceOfFunds {
  constructor(readonly value: string) {}

  static create(val: string) {
    return new SourceOfFunds(val);
  }
}

export class EstCostStr {
  constructor(readonly value: string) {}

  static create(val: string) {
    return new EstCostStr(val);
  }
}

export class ExistingCondition {
  constructor(readonly value: string) {}

  static create(val: string) {
    return new ExistingCondition(val);
  }
}

export class RepairScope {
  constructor(readonly value: string) {}

  static create(val: string) {
    return new RepairScope(val);
  }
}
