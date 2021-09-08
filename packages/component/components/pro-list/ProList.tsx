import React, {
  useCallback,
  useState,
  useRef,
  useImperativeHandle,
  useMemo,
} from 'react';
import ProList from '@ant-design/pro-list';
import { ProListProps } from '@ant-design/pro-list/es/index';
import { useList } from '../hook';
import {
  MIActionType,
  MIQueryListType,
  SharedListProps,
  Sorting,
} from '../hook/typing';
import { ProFormProps } from '@ant-design/pro-form';
import ProForm from '../pro-form';
import { PageContext } from '../context';

export declare type MIProListTypeProps<
  RecordType extends Record<string, any>,
  U extends Record<string, any> = Record<string, any>
> = SharedListProps<RecordType, U> &
  Omit<ProListProps<RecordType, U>, 'search' | 'request'> & {
    search?: ProListProps<RecordType, U>['search'] & {
      formProps: ProFormProps;
      content: React.ReactNode;
    };
    sort?: Sorting[];
  };

declare type MIListActionType = MIActionType & {
  submit: () => void;
};

const MIProList = <
  RecordType extends Record<string, any>,
  U extends Record<string, any> = Record<string, any>
>({
  search,
  sort,
  editable,
  ...props
}: MIProListTypeProps<RecordType, U>) => {
  const { request, actionRef: propsActionRef, ...sharedListProps } = useList(
    props,
  );

  const [filter, setFilter] = useState<
    Record<string, any> & {
      sort?: Sorting[];
    }
  >(search?.formProps?.initialValues || {});
  const localActionRef = useRef<MIListActionType>();
  const { actionRef: pageActionRef } = PageContext.useContainer();
  const [form] = ProForm.useForm();
  const actionRef = localActionRef || propsActionRef;
  useImperativeHandle(
    propsActionRef || pageActionRef,
    // @ts-ignore
    () => {
      if (!actionRef?.current) return undefined;
      return {
        // @ts-ignore
        ...actionRef.current,
        reload: () => {
          setFilter(form.getFieldsValue());
          actionRef?.current?.reload();
        },
      };
    },
  );

  // const f: MIQueryListType<U> | undefined = (params, options, _filter) => {
  //   if (!request) return undefined;
  //   const { sort: sortField, ...restFilter } = filter;
  //   return request(
  //     {
  //       ...params,
  //       ...restFilter,
  //     },
  //     options || sort || sortField || {},
  //     {},
  //   );
  // };
  const wrappedRequest = useCallback(
    (...argus: Parameters<MIQueryListType<U>>) => {
      if (!request) return undefined;
      const { sort: sortField, ...restFilter } = filter;
      return request(
        //@ts-ignore
        {
          ...argus[0],
          ...restFilter,
        },
        sort || sortField || argus?.[1] || {},
        {},
      );
    },
    [filter, request, sort],
  ) as any;

  const searchDom = useMemo(() => {
    if (!React.isValidElement(search?.content)) return search;
    return (
      <ProForm
        submitter={false}
        {...search?.formProps}
        form={form}
        onFinish={async values => {
          setFilter(values);
          actionRef?.current?.reload();
          search?.formProps?.onFinish?.(values);
        }}
      >
        {search?.content}
      </ProForm>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, search]);

  const { initialValues } = editable?.formProps || {};

  const listDom = (
    <ProList<RecordType, U>
      search={!React.isValidElement(search?.content) ? search : undefined}
      //@ts-ignore
      editable={
        initialValues === undefined || Object.keys(initialValues).length > 0
          ? {
              ...editable,
              formProps: {
                ...editable?.formProps,
                initialValues,
              },
            }
          : false
      }
      {...sharedListProps}
      {...props}
      request={wrappedRequest}
      actionRef={actionRef}
    />
  );

  return (
    <>
      {searchDom}
      {listDom}
    </>
  );
};

export default MIProList;
