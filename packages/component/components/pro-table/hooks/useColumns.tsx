import { useMemo } from 'react';
import { ProColumns } from '@ant-design/pro-table';
import DatePicker from '../../date-picker';
import humps from 'humps';
import { useIntl } from '../../locale';

export type ExtraColumn = 'createdBy' | 'updatedBy' | 'options';
export type DefaultTableOption =
  | 'edit'
  | 'remove'
  | 'duplicate'
  | 'batchRemove'
  | 'toggleStatus';
export type ColumnAction<T> = {
  code: DefaultTableOption;
  fieldName: string;
  render: (entity: T) => React.ReactNode;
  getNewValue: (v: any) => any;
};
export type TableFeatureRender<T> = (entity: T) => React.ReactNode;
export type TableFeature<T> =
  | DefaultTableOption
  | React.ReactNode
  | TableFeatureRender<T>
  | ColumnAction<T>;

export declare type BaseTableRowDataSchema = {
  id?: string;
  createDate?: string;
  updateDate?: string;
  updatedByUser?: string;
  createdByUser?: string;
} & Record<string, any>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useColumns = <T extends BaseTableRowDataSchema, _U, ValueType = 'text'>({
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
  const intl = useIntl();
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
        title: intl.getMessage(
          'table.column.createByAndDate',
          'Create By / Date',
        ),
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
          if (!entity.createdByUser) return '-';
          return `${entity.createdByUser} ${intl.getMessage(
            'table.template.on',
            'on',
          )} ${entity.createDate?.format()}`;
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
        title: intl.getMessage(
          'table.column.updateByAndDate',
          'Update By / Date',
        ),
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
          if (!entity.updatedByUser) return '-';
          return `${entity.updatedByUser} ${intl.getMessage(
            'table.template.on',
            'on',
          )} ${entity.updateDate?.format()}`;
        },
      });
    }

    if (defaultColumns.includes('options')) {
      extraCols.push({
        title: intl.getMessage('table.column.option', 'Option'),
        dataIndex: 'options',
        align: 'center',
        valueType: 'option',
        render: optionRender,
        fixed: 'right',
        ...columns.find(o => o.dataIndex === 'options'),
      });
    }

    return (
      (columns.filter(o => !['options'].includes(o.dataIndex as string)) || [])
        .map(o => ({
          title:
            typeof o.dataIndex === 'string'
              ? //@ts-ignore
                humps.pascalize(o.dataIndex, { separator: ' ' })
              : '',
          ...o,
        }))
        // @ts-ignore
        ?.concat(extraCols.concat(extraColumns)) as ProColumns<T>[]
    );
  }, [columns, defaultColumns, extraColumns, optionRender]);

  return mergedColumns;
};

export default useColumns;
