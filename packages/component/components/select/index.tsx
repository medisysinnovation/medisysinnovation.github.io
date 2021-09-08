import React from 'react';
import { Select } from 'antd';
import { RefSelectProps, SelectValue } from 'antd/es/select';
import DataSource, { MIDataSourceProps } from '../data-source';

export interface MIDataSelectProps<VT> extends MIDataSourceProps<VT> {}

const { Option } = Select;
const MIDataSelect = <
  VT extends SelectValue = SelectValue & { [index: string]: string }
>(
  props: MIDataSelectProps<VT>,
  ref: React.Ref<RefSelectProps>,
) => {
  const { children, ...restProps } = props;

  return (
    <DataSource {...(restProps as MIDataSourceProps<VT>)}>
      {({
        dataSource = [],
        valueField = 'value',
        displayField = 'label',
        filter,
        request,
        ...payload
      }: MIDataSourceProps<VT>) => {
        return (
          <Select
            {...{
              ref,
              style: { minWidth: 100 },
              ...payload,
            }}
          >
            {children
              ? children
              : dataSource.map((o: VT & { [index: string]: string }) => {
                  return (
                    <Option key={o[valueField]} value={o[valueField]}>
                      {o[displayField]}
                    </Option>
                  );
                })}
          </Select>
        );
      }}
    </DataSource>
  );
};

const SelectRef = React.forwardRef(MIDataSelect) as <
  VT extends SelectValue = SelectValue
>(
  props: MIDataSelectProps<VT> & { ref?: React.Ref<RefSelectProps> },
) => React.ReactElement;

type InternalSelectType = typeof SelectRef;

type SelectInterface = InternalSelectType & {
  Option: typeof Select.Option;
  OptGroup: typeof Select.OptGroup;
  SECRET_COMBOBOX_MODE_DO_NOT_USE: string;
};
const MISelect = SelectRef as SelectInterface;

MISelect.Option = Select.Option;
MISelect.OptGroup = Select.OptGroup;
MISelect.SECRET_COMBOBOX_MODE_DO_NOT_USE =
  Select.SECRET_COMBOBOX_MODE_DO_NOT_USE;

export default MISelect;
