import React from 'react';
import ProList from '@ant-design/pro-list';
import { ProListProps } from '@ant-design/pro-list/es/index';
export declare type MIProListTypeProps<
  RecordType extends Record<string, any>,
  U extends Record<string, any> = Record<string, any>
> = ProListProps<RecordType, U> & {
  test: string;
};
const MIProList = <
  RecordType extends Record<string, any>,
  U extends Record<string, any> = Record<string, any>
>(
  props: MIProListTypeProps<RecordType, U>,
) => {
  return <ProList<RecordType, U> {...props} />;
};

export default MIProList;
