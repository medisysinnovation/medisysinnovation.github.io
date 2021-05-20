import { ProFormSelect } from '@ant-design/pro-form';
import DataSource from '../data-source'
import type { MIDataSourceProps } from '../data-source';
import type { SelectValue } from 'antd/es/select';
import type { FormItemProps } from 'antd';

type ComponentProps = React.ComponentProps<typeof ProFormSelect>;

const ProSelect = <VT extends SelectValue & {
  [key: string]: number | string,
 }>(
  props: MIDataSourceProps<VT> &
    ComponentProps & {
      formItemProps?: FormItemProps;
    },
) => {
  const { children, ...restProps } = props;
  return (
    <DataSource {...(restProps as MIDataSourceProps<VT>)}>
      {({
        dataSource = [],
        valueField = 'id',
        displayField = 'text',
        filter,
        ...payload
      }: MIDataSourceProps<VT>) => {
        // console.log(dataSource,payload,dataSource.map((o:any) => ({ value: o[valueField], label: o[displayField] })))
        return (
          <ProFormSelect
            // @ts-ignore
            placeholder="Please select"
            width="xs"
            dropdownMatchSelectWidth={false}
            options={dataSource.map((o:VT) => ({ value: o[valueField], label: o[displayField] }))}
            {...payload}
          />
        );
      }}
    </DataSource>
  );
};

export default ProSelect;
