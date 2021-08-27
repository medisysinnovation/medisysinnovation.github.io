import { ProTableProps, ActionType } from '@ant-design/pro-table';
import { SortOrder } from 'antd/lib/table/interface';

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

export type MIQueryListType<U extends Record<string, any>> = (
  params: U,
  options?: Record<string, SortOrder>,
  filters?: Record<string, React.ReactText[] | null>,
) => Promise<unknown>;

export type APIInterface<
  T extends MIRecordType,
  U extends Record<string, any>
> = {
  remove?: (keys: string[]) => Promise<unknown>;
  create?: (body?: T, options?: Record<string, any>) => Promise<unknown>;
  update?: (body?: T, options?: Record<string, any>) => Promise<unknown>;
  query?: (
    params: {
      id: string;
    },
    options?: Record<string, any>,
  ) => Promise<unknown>;
  queryList?: MIQueryListType<U>;
};

export type SharedListProps<T extends MIRecordType, U> = Omit<
  ProTableProps<T, U>,
  'request' | 'rowKey'
> & {
  api?: APIInterface<T, U>;
  model?: string;
  request?: MIQueryListType<U>;
  actionRef?: React.MutableRefObject<MIActionType | undefined>;
  rowKey?: RowKey;
};
