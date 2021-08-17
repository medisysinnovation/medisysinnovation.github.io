import React from 'react';
import ProList from '@ant-design/pro-list';
import { ProListProps } from '@ant-design/pro-list/es/index';
import { useList } from '../hook';
import { SharedListProps } from '../hook/typing';

export declare type MIProListTypeProps<
  RecordType extends Record<string, any>,
  U extends Record<string, any> = Record<string, any>
> = ProListProps<RecordType, U> & SharedListProps<RecordType, U>;

const MIProList = <
  RecordType extends Record<string, any>,
  U extends Record<string, any> = Record<string, any>
>(
  props: MIProListTypeProps<RecordType, U>,
) => {
  const sharedListProps = useList(props);

  return <ProList<RecordType, U> {...props} {...sharedListProps} />;
};

export default MIProList;
