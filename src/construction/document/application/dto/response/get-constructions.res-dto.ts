export class ConstructionResDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly repair_scope: string,
    // date submit is the first decision for construction
    readonly date: string,
  ) {}
}
