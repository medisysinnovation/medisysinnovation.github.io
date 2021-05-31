export type Sorting = {
  sortBy?: string;
  order?: string;
};

export type APIInterface<T> = {
  remove?: (keys: string[]) => Promise<unknown>;
  create?: (body?: T, options?: Record<string, any>) => Promise<unknown>;
  update?: (body?: T, options?: Record<string, any>) => Promise<unknown>;
  query?: (
    params: {
      id: string;
    },
    options?: Record<string, any>,
  ) => Promise<unknown>;
  queryList?: (
    params: {
      // query
      Name?: string;
      IsActive?: boolean;
      Sorting?: Sorting[];
      PageSize?: number;
      Current?: number;
      Total?: number;
    },
    options?: Record<string, any>,
  ) => Promise<unknown>;
};
