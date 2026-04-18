export class DocumentId {
  constructor(readonly value: string | null) {}

  static create(val: string) {
    return new DocumentId(val);
  }
}

export class DocumentNo {
  constructor(readonly value: string) {}

  static create(val: string) {
    return new DocumentNo(val);
  }
}

export class DecisionId {
  constructor(readonly value: string | null) {}

  static create(val: string) {
    return new DecisionId(val);
  }
}

export class PursuantToDecTCT {
  constructor(readonly dec_id: string) {}

  static create(val: string) {
    return new PursuantToDecTCT(val);
  }
}

export class PursuantToDecTTMN {
  constructor(readonly dec_id: string) {}

  static create(val: string) {
    return new PursuantToDecTTMN(val);
  }
}

// used to nest real data
export class PursuedDec {
  constructor(
    readonly no: DocumentNo,
    readonly date: string,
  ) {}

  static create(no: DocumentNo, date: string) {
    return new PursuedDec(no, date);
  }
}
