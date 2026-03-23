export class Money {
  private readonly _amount: number;
  private readonly _estCostStr: string;

  constructor(amount: number, estCostStr?: string) {
    this._amount = amount;
    this._estCostStr = estCostStr ?? amount.toLocaleString('vi-VN');
  }

  get amount(): number {
    return this._amount;
  }

  get estCostStr(): string {
    return this._estCostStr;
  }

  add(other: Money): Money {
    return new Money(this._amount + other._amount);
  }

  subtract(other: Money): Money {
    return new Money(this._amount - other._amount);
  }

  equals(other: Money): boolean {
    return this._amount === other._amount;
  }

  toString(): string {
    return this._estCostStr;
  }

  static zero(): Money {
    return new Money(0, '0');
  }

  static fromNumber(value: number): Money {
    return new Money(value);
  }
}
