import { useMemo } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import DatePicker from '../../date-picker';
import humps from 'humps';

export type ExtraColumn = 'createdBy' | 'updatedBy' | 'options';
export type DefaultTableOption = 'edit' | 'remove' | 'duplicate' | 'batchRemove' | 'toggleStatus';
export type ColumnAction<T> = {
  code: DefaultTableOption;
  filedName: string;
  render: (entity: T) => React.ReactNode;
  getNewValue: (v: any) => any;
};
export type TableFeatureRender<T> = (entity: T) => React.ReactNode;
export type TableFeature<T> =
  | DefaultTableOption
  | React.ReactNode
  | TableFeatureRender<T>
  | ColumnAction<T>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MergedColumns = <T, _U, ValueType = 'text'>({
  columns = [],
  defaultColumns = [],
  extraColumns = [],
  optionRender = () => null,
}: {
  extraColumns: ProColumns<T>[];
  defaultColumns: ExtraColumn[];
  columns: ProColumns<T>[];
  features?: TableFeature<T>[];
  optionRender?: any;
  rowKey?: string;
}) => {
  const mergedColumns = useMemo(() => {
    const extraCols: ProColumns<T, ValueType>[] = [];
    if (defaultColumns.includes('createdBy')) {
      extraCols.push({
        title: 'Create By',
        dataIndex: 'createdByUser',
        hideInTable: true,
        hideInSearch: true,
      });
      extraCols.push({
        title: 'Create By / Date',
        dataIndex: 'createDate',
        editable: false,
        hideInSearch: true,
        formItemProps: {
          label: 'Create Date',
        },
        sorter: true,
        renderFormItem: () => {
          return <DatePicker.RangePicker showTime />;
        },
        render: (_dom: React.ReactNode, entity: T) => {
          // @ts-ignore
          if (!entity.createdByUser) return '-';
          // @ts-ignore
          return `${entity.createdByUser} on ${entity.createDate?.format()}`;
        },
      });
    }
    if (defaultColumns.includes('updatedBy')) {
      extraCols.push({
        title: 'Update By',
        dataIndex: 'updatedByUser',
        hideInTable: true,
        hideInSearch: true,
      });
      extraCols.push({
        title: 'Update By / Date',
        dataIndex: 'updateDate',
        editable: false,
        hideInSearch: true,
        sorter: true,
        formItemProps: {
          label: 'Update Date',
        },
        renderFormItem: () => {
          return <DatePicker.RangePicker showTime />;
        },
        render: (_dom: React.ReactNode, entity: T) => {
          // @ts-ignore
          if (!entity.updatedByUser) return '-';
          // @ts-ignore
          return `${entity.updatedByUser} on ${entity.updateDate?.format()}`;
        },
      });
    }

    if (defaultColumns.includes('options')) {
      extraCols.push({
        title: 'Option',
        dataIndex: 'option',
        valueType: 'option',
        render: optionRender,
        fixed: 'right',
      });
    }

    // @ts-ignore
    return (columns || [])
      .map((o) => ({
        title:
          // @ts-ignore
          typeof o.dataIndex === 'string' ? humps.pascalize(o.dataIndex, { separator: ' ' }) : '',
        ...o,
      }))
      // @ts-ignore
      ?.concat(extraCols.concat(extraColumns)) as ProColumns<T>[];
  }, [columns, defaultColumns, extraColumns, optionRender]);

  return mergedColumns;
};

export default MergedColumns;
