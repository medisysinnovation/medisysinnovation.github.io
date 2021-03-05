import React, { useEffect, useState } from 'react';
import { useEventListener } from 'ahooks';
import { Select } from 'antd';
import { MIConfig } from '@medisys/utils';
import config from './config';

type SelectType = typeof Select;
export interface MIDataSelectProps extends SelectType {
  code: string;
  model?: string;
  valueField?: string;
  textField?: string;
  dataSourceLoader?: (code: string, params?: any) => Promise<[]>;
}
const { Option } = Select;

const MIDataSelect: React.FC<MIDataSelectProps> = ({
  model,
  code,
  valueField = 'id',
  textField = 'text',
  children,
  dataSourceLoader,
  ...restProps
}) => {
  const [list, setList] = useState([]);
  const [dataSourceLoading, setDataSourceLoading] = useState(false);

  useEventListener('mi_datasourcechanged_' + code, (e: CustomEvent) => {
    console.log(e);
    setList(e.detail ?? []);
    setDataSourceLoading(false);
    // const list = e.detail[code] ?? [];
    // if (model) setSpinning(!!models[model]);
  });

  useEffect(() => {
    if (code) {
      // MIConfig.
      if (dataSourceLoader) {
        dataSourceLoader(code).then(newData => {
          setList(newData);
        });
      } else {
        setDataSourceLoading(true);
        MIConfig.loadData(code);
      }
      // config.load({ code });
    }
  }, []);
  console.log(list);
  return (
    <Select
      loading={dataSourceLoading}
      // showSearch
      style={{ minWidth: 100 }}
      // placeholder="Select a person"
      // optionFilterProp="children"
      {...restProps}
    >
      {children
        ? children
        : list.map((o: { [index: string]: string }) => (
            <Option key={o[valueField]} value={o[valueField]}>
              {o[textField]}
            </Option>
          ))}
    </Select>
  );
};

export default MIDataSelect;
