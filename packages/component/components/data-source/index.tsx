import React, { useEffect, useState, useMemo } from 'react';
import { useEventListener } from 'ahooks';
import { SelectProps, SelectValue } from 'antd/es/select';

import { MIConfig, GET } from '@medisys/utils';
import { usePrevious } from '../hook';

export enum CodeTableSourceFilterRule {
  StartsWidth,
  Contains,
}

export declare type FilterFunc<OptionType> = (
  inputValue: string,
  option?: OptionType,
) => boolean;

export interface MIDataSourceProps<VT> extends SelectProps<VT> {
  code?: string;
  url?: string;
  text?: boolean;
  valueField?: string;
  displayField?: string;
  dependencies?: any[];
  dataSource?: VT[];
  dataSourceLoader?: (code: string, params?: any) => Promise<VT[]>;
  filter?: (currentValue: VT, index: number, array: VT[]) => boolean;
  filterRule?: CodeTableSourceFilterRule | CodeTableSourceFilterRule.Contains;
  onChange?: (value: VT, option: object) => void;
  onDataSourceChange?: (array: VT[]) => void;
  dataFormatter?: (array: VT[]) => VT[];
  children?: React.ReactNode;
}

export interface MIDataSourceChildrenProps<VT> {
  valueField: string;
  displayField: string;
  dataSource: VT[];
}

const loadDataFromURL = async ({ url, code, dataFormatter }: any) => {
  const result = await GET(url, { pageSize: 9999 });
  const data = dataFormatter ? dataFormatter(result) : result?.data;
  if (code) {
    MIConfig.updateState({
      dataSource: {
        [code]: data ?? [],
      },
    });
    delete codeLoading[code];
  }

  return new Promise((resolve, reject) => {
    if (data) {
      resolve(data);
    } else {
      reject({
        message: 'not able to retrieve data',
      });
    }
  });
};

const codeLoading: { [key: string]: boolean } = {};
const defaultDependencies: any[] = [];
const MIDataSource = <VT extends SelectValue = SelectValue>(
  props: MIDataSourceProps<VT>,
) => {
  const {
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
    onChange,
    dataFormatter,
    onDataSourceChange,
    filterOption,
    dependencies = defaultDependencies,
    ...restProps
  } = props;
  const [list, setList] = useState<VT[]>([]);
  const [filteredList, setFilteredList] = useState<VT[]>([]);
  //console.log(restProps);
  const [dataSourceLoading, setDataSourceLoading] = useState(false);
  const prevDependency = usePrevious(dependencies) || defaultDependencies;
  const setRawData = (newData: VT[]) => {
    const d = dataFormatter ? dataFormatter(newData) : newData;
    if (onDataSourceChange) onDataSourceChange(d);
    setList(d);
  };
  useEventListener('mi_datasourcechanged_' + code, (e: CustomEvent) => {
    //console.log(2, e.detail);

    setRawData(e.detail ?? []);
    setDataSourceLoading(false);
  });

  // useWhyDidYouUpdate('Data Source', { ...props });

  useEffect(() => {
    if (code) {
      const existList = MIConfig.getData(code);

      if (existList.length > 0) {
        //console.log(3, existList);
        setRawData(existList);
        return;
      }
      if (!url) {
        if (list.length) {
          return;
        }

        if (dataSourceLoader) {
          dataSourceLoader(code).then(newData => {
            //console.log(4, newData);
            setRawData(newData);
          });
        } else {
          setDataSourceLoading(true);
          MIConfig.loadData(code);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (url) {
      if (code) {
        const existList = MIConfig.getData(code);

        if (existList.length > 0) {
          //console.log(5, existList);
          setRawData(existList);
          return;
        }
      }

      setDataSourceLoading(true);
      if (!code || !codeLoading[code]) {
        if (code) {
          codeLoading[code] = true;
        }

        loadDataFromURL({
          url,
          code,
          dataFormatter,
        }).then((data: any) => {
          setDataSourceLoading(false);

          setRawData(data);
        });
      }
    }
  }, [url]);

  useEffect(() => {
    if (dataSource) {
      //console.log(1, dataSource);
      setList(dataSource);
    }
  }, [dataSource]);

  useEffect(() => {
    //console.log(list);
    if (typeof filter === 'function') {
      setFilteredList(list.filter(filter));
    } else {
      setFilteredList(list);
    }
  }, [list]);

  useEffect(() => {
    if (typeof filter === 'function') {
      if (
        dependencies.length !== prevDependency.length ||
        !dependencies.every((...[, p]) => {
          return dependencies[p] === prevDependency[p];
        })
      )
        setFilteredList(list.filter(filter));
    }
  }, [dependencies]);

  if (text) {
    const option = filteredList.find(
      (opt: VT) =>
        //@ts-ignore
        opt[valueField || 'id'] === restProps.value,
    );
    //@ts-ignore
    if (option) return <span>{option[displayField]}</span>;
    return null;
  }
  const handleFilter = useMemo(() => {
    if (filterOption) return filterOption;
    return (input: string, option: any) => {
      if (filterRule === CodeTableSourceFilterRule.Contains)
        return (
          option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      return option?.children?.toLowerCase().startsWith(input.toLowerCase());
    };
  }, [filterRule]);

  const handleOnChange = (value: VT, option: Object) => {
    const opt = filteredList.find((opt: any) => opt[valueField] === value);
    //console.log(opt, onChange);
    onChange && onChange(value, { ...option, data: opt });
  };
  // //console.log(list);
  // if(typeof children === function)
  // if(typeof children =)
  // //console.log(
  //   isReact.component(children),
  //   typeof children,
  //   children,
  //   isReact.element(children),
  // );
  const sharedProps = {
    ...props,
    loading: dataSourceLoading,
    filterOption: handleFilter,
    onChange: handleOnChange,
  };
  if (typeof children === 'function') {
    return children({
      dataSource: filteredList,

      ...sharedProps,
    } as MIDataSourceProps<VT>);
  }
  //@ts-ignore
  return React.cloneElement(children, {
    a: 11,
    ...sharedProps,
  });
};

export default MIDataSource;
