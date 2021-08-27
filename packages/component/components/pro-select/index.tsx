import React from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import DataSource from '../data-source';
import { MIDataSourceProps } from '../data-source';
import { SelectValue } from 'antd/es/select';
import { FormItemProps } from 'antd';
import { useIntl } from '../locale';

type ComponentProps = React.ComponentProps<typeof ProFormSelect>;

const ProSelect = <
  VT extends SelectValue & {
    [key: string]: number | string;
  }
>(
  props: MIDataSourceProps<VT> &
    ComponentProps & {
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
