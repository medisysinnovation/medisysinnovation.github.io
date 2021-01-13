export class Pager {
  total: number = 0;

  pageSize: number = 10;

  current: number = 1;
}
export interface Sorting {
  sortBy: string;
  order: 'ASC' | 'DESC';
}
