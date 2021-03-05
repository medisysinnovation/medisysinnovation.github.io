import React from 'react';
import { RefSelectProps, SelectValue } from 'antd/es/select';

import { Select } from 'antd';
import MIDataSelect, { MIDataSelectProps } from './data-select';

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
