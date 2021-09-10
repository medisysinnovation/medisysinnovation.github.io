import React from 'react';
import { Select } from 'antd';
import { RefSelectProps, SelectValue } from 'antd/es/select';
import DataSource, { MIDataSourceProps } from '../data-source';

export interface MIDataSelectProps<VT> extends MIDataSourceProps<VT> {}

const { Option } = Select;
const MIDataSelect = <VT extends Record<string, any>>(
  props: MIDataSelectProps<VT>,
  ref: React.Ref<RefSelectProps>,
) => {
  const { children, ...restProps } = props;
  const config: MIDataSourceProps<VT> = {};
  if (children && restProps.optionLabelProp) {
    config.onRenderText = (value: SelectValue) => {
      if (restProps.mode) {
        return (Array.isArray(value) ? value : value ? [value] : [])
          .map(
            v =>
              (children as any[]).find(o => o.key === `${v}`)?.props[
                restProps.optionLabelProp || 'label'
              ],
          )
          .join(restProps.spliter || ',');
      }

      return (children as any[]).find(o => o.key === `${value}`).props[
        restProps.optionLabelProp || 'label'
      ];
    };
  }
  return (
    <DataSource<VT> {...config} {...(restProps as MIDataSourceProps<VT>)}>
      {({
        dataSource = [],
        valueField = 'value',
        displayField = 'label',
        filter,
        request,
        ...payload
      }: MIDataSourceProps<VT>) => {
        return (
          //@ts-ignore
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
