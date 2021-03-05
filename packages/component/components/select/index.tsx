import React from 'react';
import { RefSelectProps } from 'antd/es/select';

import { Select } from 'antd';
import MIDataSelect, { SelectValue, MIDataSelectProps } from './data-select';

const SelectRef = React.forwardRef(MIDataSelect) as <
  VT extends SelectValue = SelectValue
>(
  props: MIDataSelectProps<VT> & { ref?: React.Ref<RefSelectProps> },
) => React.ReactElement;

type SelectType = typeof SelectRef;

type MISelectType = SelectType & {
  Option: typeof Select.Option;
  OptGroup: typeof Select.OptGroup;
  DataSelect: typeof MIDataSelect;
  SECRET_COMBOBOX_MODE_DO_NOT_USE: string;
};
const MISelect = SelectRef as MISelectType;

MISelect.Option = Select.Option;
MISelect.OptGroup = Select.OptGroup;
MISelect.SECRET_COMBOBOX_MODE_DO_NOT_USE =
  Select.SECRET_COMBOBOX_MODE_DO_NOT_USE;

export default MISelect;
