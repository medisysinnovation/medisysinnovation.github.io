import { Moment } from "moment";

export * from "./calculation";
export * from "./test";

export const dateTimeCompare = (
  a: Moment | undefined | null,
  b: Moment | undefined | null
) => {
  if (!a) return -1;
  if (!b) return 1;
  return a!.valueOf() - b!.valueOf();
};
