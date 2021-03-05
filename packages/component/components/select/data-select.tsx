import React, { useEffect, useState, useMemo } from 'react';
import { useEventListener } from 'ahooks';
import { Select } from 'antd';
import { MIConfig, GET } from '@medisys/utils';

type SelectType = typeof Select;
export interface MIDataSelectProps extends SelectType {
  code?: string;
  url?: string;
  model?: string;
  text?: boolean;
  valueField?: string;
  displayField?: string;
  dataSource?: object[];
  dataSourceLoader?: (code: string, params?: any) => Promise<object[]>;
  filter?: (options: object[]) => object[];
  filterRule?: CodeTableSelectFilterRule | CodeTableSelectFilterRule.Contains;
}
export enum CodeTableSelectFilterRule {
  StartsWidth,
  Contains,
}

const { Option } = Select;
const codeLoading: { [key: string]: boolean } = {};

const MIDataSelect: React.FC<MIDataSelectProps> = ({
  model,
  code,
  valueField = 'id',
  displayField = 'text',
  children,
  dataSource,
  dataSourceLoader,
  filter,
  filterRule,
  url,
  text,
  ...restProps
}) => {
  const [list, setList] = useState<object[]>([]);
  const [filteredList, setFilteredList] = useState<object[]>([]);

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

  useEffect(() => {
    if (url && code) {
      setDataSourceLoading(true);
      if (!codeLoading[code]) {
        codeLoading[code] = true;
        GET(url, { pageSize: 9999 }).then(result => {
          const data = result && result.data ? result.data : [];
          delete codeLoading[code];
          MIConfig.updateState({
            dataSource: {
              [code]: data,
            },
          });
        });
      }
    }
  }, [url]);

  useEffect(() => {
    if (dataSource) {
      setList(dataSource);
    }
  }, [dataSource]);

  useEffect(() => {
    if (typeof filter === 'function') {
      setFilteredList(list.filter(filter));
    } else {
      setFilteredList(list);
    }
  }, [list]);

  const handleFilter = useMemo(() => {
    return (input: string, option: any) => {
      if (filterRule === CodeTableSelectFilterRule.Contains)
        return (
          option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      return option?.children?.toLowerCase().startsWith(input.toLowerCase());
    };
  }, [filterRule]);

  // const handleOnChange = (value: ValueType, option: any) => {
  //   const { onChange } = restProps;
  //   const sourceOption = options.find(
  //     (opt: any) => opt[valueMember || 'id'] === value,
  //   );
  //   onChange && onChange(value, { ...option, data: sourceOption });
  // };

  if (text) {
    const option = filteredList.find(
      (opt: { [key: string]: string }) =>
        opt[valueField || 'id'] === restProps.value,
    );
    if (option) return <span>{option[displayField || 'name']}</span>;
    return null;
  }

  console.log(list);
  return (
    <Select
      loading={dataSourceLoading}
      // showSearch
      style={{ minWidth: 100 }}
      filterOption={handleFilter}
      // placeholder="Select a person"
      // optionFilterProp="children"
      {...restProps}
      // onChange={handleOnChange}
    >
      {children
        ? children
        : filteredList.map((o: { [index: string]: string }) => (
            <Option key={o[valueField]} value={o[valueField]}>
              {o[displayField]}
            </Option>
          ))}
    </Select>
  );
};

export default MIDataSelect;
