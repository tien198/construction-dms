export class BidPackageId {
  constructor(readonly value: string | null = null) {}

  static create(val: string) {
    return new BidPackageId(val);
  }
}

export class SnapshotId {
  constructor(readonly value: string | null = null) {}

  static create(val: string) {
    return new SnapshotId(val);
  }
}

export class ProjectOwner {
  constructor(readonly value: string) {}

  static create(val: string) {
    return new ProjectOwner(val);
  }
}

export class BidPackageName {
  constructor(readonly value: string) {}

  static create(val: string) {
    return new BidPackageName(val);
  }
}

// short_description
export class ShortDesc {
  constructor(readonly value: string) {}

  static create(val: string) {
    return new ShortDesc(val);
  }
}

export class EstCostStr {
  constructor(readonly value: string) {}

  static create(val: string) {
    return new EstCostStr(val);
  }
}

export class BidderSelectionMethod {
  constructor(readonly value: string) {}

  static create(val: string) {
    return new BidderSelectionMethod(val);
  }
}

export class Duration {
  constructor(readonly value: string) {}

  static create(val: string) {
    return new Duration(val);
  }
}

export class SuccessfulBidderId {
  constructor(readonly value: string | null) {}

  static create(val: string) {
    return new SuccessfulBidderId(val);
  }
}
