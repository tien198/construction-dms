export class DateRange {
  private readonly _implStartDate: Date;
  private readonly _implEndDate: Date;

  constructor(implStartDate: Date, implEndDate: Date) {
    if (implStartDate > implEndDate) {
      throw new Error(
        'impl_start_date must be before or equal to impl_end_date',
      );
    }
    this._implStartDate = implStartDate;
    this._implEndDate = implEndDate;
  }

  get implStartDate(): Date {
    return this._implStartDate;
  }

  get implEndDate(): Date {
    return this._implEndDate;
  }

  durationInDays(): number {
    const ms = this._implEndDate.getTime() - this._implStartDate.getTime();
    return Math.ceil(ms / (1000 * 60 * 60 * 24));
  }

  includes(date: Date): boolean {
    return date >= this._implStartDate && date <= this._implEndDate;
  }

  overlaps(other: DateRange): boolean {
    return (
      this._implStartDate <= other._implEndDate &&
      this._implEndDate >= other._implStartDate
    );
  }

  equals(other: DateRange): boolean {
    return (
      this._implStartDate.getTime() === other._implStartDate.getTime() &&
      this._implEndDate.getTime() === other._implEndDate.getTime()
    );
  }

  static fromStrings(startStr: string, endStr: string): DateRange {
    return new DateRange(new Date(startStr), new Date(endStr));
  }
}
