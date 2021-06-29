import type { ProColumns } from '@ant-design/pro-table';

 const defaultColumns: ProColumns<any>[] = [
  {
    dataIndex: 'code',
    sorter: true,
    sortBy:'a.id',//sort by another field
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
  {
    dataIndex: 'balance',
    // hideInForm: true,
    valueType:'money'
  },  
  {
    dataIndex: 'closeDate',
   
    valueType:'dateTime'
  }, 
];

export {defaultColumns}