import { ProTableProps, ActionType } from '@ant-design/pro-table';

type GetRowKey = () => string;
export type RowKey = string | GetRowKey;

export type Sorting = {
  sortBy?: string;
  order?: string;
};

export type MIActionType = {
  getRecords?: () => readonly any[];
} & ActionType;

export type UseMIFetchDataAction<T = any> = {
  dataSource: readonly T[] | undefined;
  currentData: readonly T[] | undefined;
};

export type MIRecordType = {
  isUserMaintainable?: boolean;
} & {
  [key: string]: number | string | boolean;
};

export type APIInterface<T extends MIRecordType> = {
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

export type SharedListProps<T extends MIRecordType, U> = Omit<
  ProTableProps<T, U>,
  'request' | 'rowKey'
> & {
  api?: APIInterface<T>;
  model?: string;
  request?: () => Promise<unknown>;
  actionRef?: React.MutableRefObject<MIActionType | undefined>;
  rowKey?: RowKey;
};
