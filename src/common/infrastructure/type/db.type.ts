type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined
  | Date;

export type Path<T> = {
  [K in keyof T & string]: T[K] extends Primitive
    ? K
    : T[K] extends Array<infer U>
      ? K | `${K}.${Path<NonNullable<U>>}`
      : K | `${K}.${Path<NonNullable<T[K]>>}`;
}[keyof T & string];

export type Filter<T> = {
  [P in Path<T>]?: any;
};
