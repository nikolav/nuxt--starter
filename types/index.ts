const objectEmpty = {};
//
export type OrNull<T> = T | null;
export type OrNoValue<T> = T | null | undefined;
export type OneOrMany<T> = T | T[];
export type OneOrManyOrNull<T> = OrNull<OneOrMany<T>>;
export type CallbackAny = (...args: any[]) => any;
export type ScalarAny = string | number | symbol;
export type TPrimitive = ScalarAny;
export type Flatten<T> = T extends Array<infer Item> ? Item : T;
export type GetReturnType<T> = T extends (...args: never[]) => infer R
  ? R
  : never;
export type OptionsFlags<T> = {
  [K in keyof T]: boolean;
};
export type CreateMutable<T> = {
  -readonly [K in keyof T]: T[K];
};
export type CreateRequired<T> = {
  [K in keyof T]-?: T[K];
};
export type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
export type WithouFieldId<T> = {
  [K in keyof T as Exclude<K, "id">]: T[K];
};
export type ObjectEmpty = typeof objectEmpty;
export type TEmailConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  defaultFrom: string;
  defaultTo: string;
};
