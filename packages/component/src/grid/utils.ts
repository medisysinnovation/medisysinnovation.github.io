export { getMaxHeight } from "@medisys/utils";

export const getTotalString = (total: number, range: [number, number]) =>
  `${range[0]}-${range[1]} of ${total} items`;
