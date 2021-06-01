import type { ProColumns } from '@ant-design/pro-table';

 const defaultColumns: ProColumns<any>[] = [
  {
    dataIndex: 'code',
    sorter: true,
    defaultSortOrder: 'ascend',
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  {
    title: 'Display',
    dataIndex: 'displayValue',
    sorter: true,
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  {
    dataIndex: 'description',
    hideInForm: true,
    fieldProps: {
      rows: 1,
    },
  },
];

export {defaultColumns}