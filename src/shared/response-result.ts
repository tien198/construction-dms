export class ResResult<T> {
  constructor(
    public result: T,
    public message?: string,
  ) {}
}
