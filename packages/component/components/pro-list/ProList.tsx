import React, { useCallback } from 'react';
import ProList from '@ant-design/pro-list';
import { ProListProps } from '@ant-design/pro-list/es/index';
import { queryListRequest } from '../pro-table/utils';
import { APIInterface } from 'components/pro-table/typing';
import { MIConfig } from '@medisys/utils';

export declare type MIProListTypeProps<
  RecordType extends Record<string, any>,
  U extends Record<string, any> = Record<string, any>
> = ProListProps<RecordType, U> & {
  api: APIInterface<RecordType>;
  model?: string;
};

const getUseModel = MIConfig.getModelHook;

const MIProList = <
  RecordType extends Record<string, any>,
  U extends Record<string, any> = Record<string, any>
>({
  request,
  api,
  model,
  ...props
}: MIProListTypeProps<RecordType, U>) => {
  const { api: modelAPI } = getUseModel()(model as any) || {
    api: {},
  };

  const { queryList } = api || modelAPI;

  const _request = useCallback(
    queryListRequest({
      request,
      queryHandler: queryList,
    }),
    [request, queryList],
  );

  return <ProList<RecordType, U> request={_request} {...props} />;
};

export default MIProList;
