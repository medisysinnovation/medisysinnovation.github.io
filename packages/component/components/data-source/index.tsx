import React, { useEffect, useState, useMemo, ReactNode } from 'react';
import { useEventListener } from 'ahooks';
import { SelectProps } from 'antd/es/select';
import { RequestData } from '@ant-design/pro-table/es/typing';
import { ParamsType } from '@ant-design/pro-provider';
import { SortOrder } from 'antd/lib/table/interface';
import { useMountMergeState } from '@ant-design/pro-utils';
import { MIConfig, GET } from '@medisys/utils';
import { usePrevious } from '../hook';
import { pickProps } from '../utils';
import { SelectValue } from 'antd/lib/select';

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
  readonly?: boolean;
  spliter?: string;
  valueField?: string;
  displayField?: string;
  dependencies?: any[];
  dataSource?: VT[];
  dataSourceLoader?: (code: string, params?: any) => Promise<VT[]>;
  filter?: (currentValue: VT, index: number, array: VT[]) => boolean;
  filterRule?: CodeTableSourceFilterRule | CodeTableSourceFilterRule.Contains;
  onChange?: (value: VT, option: object) => void;
  onDataSourceChange?: (array: VT[]) => void;
  remoteDataFormatter?: (source: any) => VT[];
  children?: React.ReactNode;
  /** @name 是否手动触发请求 */
  manualRequest?: boolean;
  params?: ParamsType;
  request?: (
    params: ParamsType & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[]>,
  ) => Promise<Partial<RequestData<VT>>>;
  pro?: boolean;
  onRenderText?: (value: SelectValue) => string | ReactNode;
  /* deprecated */
  text?: boolean;
  url?: string;
}

export interface MIDataSourceChildrenProps<VT> {
  valueField: string;
  displayField: string;
  dataSource: VT[];
}

const loadRemoteData = async ({
  url,
  request,
  code,
  remoteDataFormatter,
}: any) => {
  const result = request ? await request() : await GET(url, { pageSize: 9999 });
  const data = remoteDataFormatter ? remoteDataFormatter(result) : result?.data;
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
const MIDataSource = <VT extends Record<string, any>>(
  props: MIDataSourceProps<VT>,
) => {
  const {
    code,
    valueField = 'value',
    displayField = 'label',
    dataSource,
    dataSourceLoader,
    filter,
    filterRule,
    url,
    text,
    readonly,
    spliter = ', ',
    onChange,
    onDataSourceChange,
    filterOption,
    dependencies = defaultDependencies,
    request,
    manualRequest,
    pro,
    ...restProps
  } = props;
  const { remoteDataFormatter, onRenderText, params, ...otherProps } = props;

  const [list, setList] = useState<VT[]>([]);
  const [filteredList, setFilteredList] = useState<VT[]>([]);
  const [dataSourceLoading, setDataSourceLoading] = useState(false);
  const prevDependency = usePrevious(dependencies) || defaultDependencies;
  const setRawData = (newData: VT[]) => {
    const d = newData;
    if (onDataSourceChange) onDataSourceChange(d);
    setList(d);
  };
  //@ts-ignore
  useEventListener('mi_data_source_changed_' + code, (e: CustomEvent) => {
    //console.log(2, e.detail);

    setRawData(e.detail ?? []);
    setDataSourceLoading(false);
  });

  // useWhyDidYouUpdate('Data Source', { ...props });

  // const [formSearch, setFormSearch] = useMountMergeState<Record<string, any> | undefined>(() => {
  //   // 如果手动模式，或者 search 不存在的时候设置为 undefined
  //   // undefined 就不会触发首次加载
  //   if (manualRequest) {
  //     return undefined;
  //   }
  //   return {};
  // });

  const [proFilter] = useMountMergeState<Record<string, React.ReactText[]>>({});
  const [proSort] = useMountMergeState<Record<string, SortOrder>>({});

  const fetchData = useMemo(() => {
    if (!request) return undefined;
    return async (pageParams?: Record<string, any>) => {
      const actionParams = {
        ...(pageParams || {}),
        ...params,
      };
      // eslint-disable-next-line no-underscore-dangle
      delete (actionParams as any)._timestamp;
      const response = await request(
        (actionParams as unknown) as ParamsType,
        proSort,
        proFilter,
      );
      return response as RequestData<VT>;
    };
  }, [params, request, proFilter, proSort]); // formSearch, proFilter, proSort,

  useEffect(() => {
    if (code) {
      const existList = MIConfig.getData(code);

      if (existList.length > 0) {
        //console.log(3, existList);
        setRawData(existList);
        return;
      }
      if (!url && !request) {
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
          MIConfig.loadData(code, params);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (url || request) {
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

        loadRemoteData({
          url,
          request: fetchData,
          code,
          remoteDataFormatter,
        }).then((data: any) => {
          setDataSourceLoading(false);

          setRawData(data);
        });
      }
    }
  }, [url, request]);

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
  if (!pro && (text || readonly)) {
    if (onRenderText) {
      return onRenderText(restProps.value as SelectValue);
    }
    const options = filteredList.filter(
      (opt: VT) =>
        //@ts-ignore
        opt[valueField] === restProps.value ||
        (Array.isArray(restProps.value) &&
          //@ts-ignore
          restProps.value.includes(opt[valueField])),
    );
    //@ts-ignore
    if (options.length > 0)
      return (
        <span {...pickProps(restProps, ['className', 'style'])}>
          {options.map((o: any, i) => {
            return (
              <span key={o[displayField]}>
                {o[displayField] || '-'}
                {i < options.length - 1 ? spliter : ''}
              </span>
            );
          })}
        </span>
      );
    return null;
  }
  const handleFilter = useMemo(() => {
    if (filterOption === false) return false;
    if (filterOption) return filterOption;
    return (input: string, option: any) => {
      if (filterRule === CodeTableSourceFilterRule.Contains)
        return (
          option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      return option?.children?.toLowerCase().startsWith(input.toLowerCase());
    };
  }, [filterRule, filterOption]);

  const handleOnChange = (value: VT, option: Object) => {
    const opt = filteredList.find((opt: any) => opt[valueField] === value);
    //console.log(opt, onChange);
    onChange && onChange(value, { ...option, data: opt });
  };
  const sharedProps = {
    ...otherProps,
    loading: dataSourceLoading,
    filterOption: handleFilter,
    onChange: handleOnChange,
  };
  const { children, ...funcProps } = sharedProps;
  if (typeof children === 'function') {
    return children({
      dataSource: filteredList,
      ...funcProps,
    } as MIDataSourceProps<VT>);
  }
  //@ts-ignore
  return React.cloneElement(children, {
    ...sharedProps,
  });
};

export default MIDataSource;
