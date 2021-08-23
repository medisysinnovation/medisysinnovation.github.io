import {
  RowEditableConfig,
  ProCoreActionType,
  ProSchema,
} from '@ant-design/pro-utils';
import { ProTableProps, ProColumns } from '@ant-design/pro-table';
import { EditableProTableProps } from '@ant-design/pro-table/lib/components/EditableTable';
import { ExtraColumn, TableFeature } from './hooks/useColumns';
import { MIRecordType, SharedListProps } from '../hook/typing';

type SharedTableProps<T extends MIRecordType, U> = SharedListProps<T, U> & {
  features?: TableFeature<T>[];
  defaultColumns?: ExtraColumn[];
  optionColumnRender?: any[];
  editable?: MIRowEditableConfig<T>;
  // model name, refer to @/models folder
  columns?: MITableColumn<T, U>[];
};

export type MIRowEditableConfig<T> = RowEditableConfig<T> & {
  onRowDataChanged: (entities: T[]) => void;
};
export type MIProEditableTableProps<
  T extends MIRecordType,
  U,
  ValueType
> = EditableProTableProps<T, U> &
  SharedTableProps<T, ValueType> & {
    behavior?: {
      reloadOnSave?: boolean;
    };
  };

export type MITableColumn<T, ValueType> = ProColumns<T, ValueType> & {
  sortBy?: string;
};

export type MIProTableProps<T extends MIRecordType, U, ValueType> = Omit<
  ProTableProps<T, U, ValueType>,
  'request' | 'columns'
> &
  SharedTableProps<T, U> & {
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
    columns?: MITableColumn<T, ValueType>[];
  };
