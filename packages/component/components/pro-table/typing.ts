import type { RowEditableConfig, ProCoreActionType, ProSchema } from '@ant-design/pro-utils';
import type { ProTableProps,ProColumns ,ActionType,} from '@ant-design/pro-table';
import type {EditableProTableProps} from '@ant-design/pro-table/lib/components/EditableTable'
import type { ExtraColumn, TableFeature } from './hooks/useColumns';

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

type SharedTableProps<T>={
  features?: TableFeature<T>[];
  defaultColumns?: ExtraColumn[];
  optionColumnRender?: any[];
}

export type MIRowEditableConfig<T> = RowEditableConfig<T> & {
  onRowDataChanged: (entities: T[]) => void;
};
export type MIProEditableTableProps<T, U> = EditableProTableProps<T, U>  &  SharedTableProps<T>
export type MIProTableProps<T, U, ValueType> = Omit<
  ProTableProps<T, U, ValueType>,
  'request' | 'columns'
> & SharedTableProps<T> & {
  // model name, refer to @/models folder
  model?: string;
  request?: () => Promise<unknown>;
  editable?: MIRowEditableConfig<T>;
  api?: APIInterface<T>;
  optionColumnEditRender?: (
    dom: React.ReactNode,
    entity: T,
    index: number,
    action: ProCoreActionType,
    schema: ProSchema<T> & {
      isEditable?: boolean;
      type: unknown;
    },
  ) => React.ReactNode;
  onRowDblClick?: (entity: T) => void;
  onEdit?: (entity: T) => void;
  rowKey?: RowKey;
  columns?: ProColumns<T, ValueType>[] & {
    sortBy? :string
  };
};

