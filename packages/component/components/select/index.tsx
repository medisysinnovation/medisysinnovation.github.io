import { Select } from 'antd';
import MIDataSelect from './data-select';
import config, { ConfigParamter } from './config';
type SelectType = typeof MIDataSelect;
type MISelectType = SelectType & {
  config: (payload: ConfigParamter) => void;
  Option: typeof Select.Option;
  OptGroup: typeof Select.OptGroup;
  DataSelect: typeof MIDataSelect;
  SECRET_COMBOBOX_MODE_DO_NOT_USE: string;
};

const MISelect = MIDataSelect as MISelectType;

MISelect.DataSelect = MIDataSelect;
MISelect.config = config;
MISelect.Option = Select.Option;
MISelect.OptGroup = Select.OptGroup;
MISelect.SECRET_COMBOBOX_MODE_DO_NOT_USE =
  Select.SECRET_COMBOBOX_MODE_DO_NOT_USE;

export default MISelect;
