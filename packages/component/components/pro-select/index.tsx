import React from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import DataSource from '../data-source';
import { MIDataSourceProps } from '../data-source';
import { FormItemProps } from 'antd';
import { useIntl } from '../locale';
import { ProFormSelectProps } from '@ant-design/pro-form/es/components/Select';

const ProSelect = <
  VT extends {
    [key: string]: any;
  }
>(
  props: MIDataSourceProps<VT> &
    ProFormSelectProps<VT> & {
      formItemProps?: FormItemProps;
    },
) => {
  const intl = useIntl();
  const { children, ...restProps } = props;
  return (
    <DataSource pro {...(restProps as MIDataSourceProps<VT>)}>
      {({
        dataSource = [],
        valueField = 'id',
        displayField = 'text',
        filter,
        request,
        ...payload
      }: MIDataSourceProps<VT>) => {
        // console.log(dataSource,payload)
        // console.log(dataSource,payload,dataSource.map((o:any) => ({ value: o[valueField], label: o[displayField] })))
        return (
          <ProFormSelect
            // @ts-ignore
            placeholder={intl.getMessage('form.select', 'Please select')}
            width="xs"
            dropdownMatchSelectWidth={false}
            options={dataSource.map((o: VT) => ({
              key: o[valueField],
              value: o[valueField],
              label: o[displayField],
            }))}
            {...payload}
          />
        );
      }}
    </DataSource>
  );
};

export default ProSelect;
