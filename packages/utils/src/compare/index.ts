import { Moment } from "moment";
export const stringCompare = (a: string, b: string) => {
  if (!a) return -1;
  if (!b) return 1;
  return a.toUpperCase().localeCompare(b.toUpperCase());
};
export const numberCompare = (a: number, b: number) => {
  if (!a) return -1;
  if (!b) return 1;
  return a - b;
};

export const dateTimeCompare = (
  a: Moment | undefined | null,
  b: Moment | undefined | null
) => {
  if (!a) return -1;
  if (!b) return 1;
  return a!.valueOf() - b!.valueOf();
};
