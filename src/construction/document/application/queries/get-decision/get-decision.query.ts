export class GetDecisionQuery {
  constructor(
    public readonly constructionId: string,
    public readonly period: string,
  ) {}
}
