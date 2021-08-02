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

export type MIRecordType ={
  isUserMaintainable?: boolean;
} & {
  [key: string]: number | string | boolean,
}

export type APIInterface<T extends MIRecordType> = {
  remove?: (keys: string[]) => Promise<unknown>;
  create?: (params?:Record<string, any> ,body?: T, options?: Record<string, any>) => Promise<unknown>;
  update?: (params?:Record<string, any>, body?: T, options?: Record<string, any>) => Promise<unknown>;
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

export type MIProTableColumnType<T, ValueType>=ProColumns<T, ValueType>[] & {
  sortBy? :string
}

type SharedTableProps<T extends MIRecordType,ValueType>={
  features?: TableFeature<T>[];
  defaultColumns?: ExtraColumn[];
  optionColumnRender?: any[];
  api?: APIInterface<T>;
  editable?: MIRowEditableConfig<T>;
  // model name, refer to @/models folder
  model?: string;
  columns?: MIProTableColumnType<T, ValueType>;
}

export type MIRowEditableConfig<T> = RowEditableConfig<T> & {
  onRowDataChanged: (entities: T[]) => void;
};
export type MIProEditableTableProps<T extends MIRecordType, U, ValueType> = EditableProTableProps<T, U>  &  SharedTableProps<T, ValueType> & {
  behavior?:{
    reloadOnSave?:boolean;
  }
}

export type MITableColumn<T, ValueType> = ProColumns<T, ValueType> & {
  sortBy? :string
}

export type MIProTableProps<T extends MIRecordType, U, ValueType> = Omit<
  ProTableProps<T, U, ValueType>,
  'request' | 'columns'
> & SharedTableProps<T,ValueType> & {

  request?: () => Promise<unknown>;
  editable?: MIRowEditableConfig<T>;
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
  onEdit?: (entity: T) => void;
  rowKey?: RowKey;
  columns?: MITableColumn<T, ValueType>[]
};

