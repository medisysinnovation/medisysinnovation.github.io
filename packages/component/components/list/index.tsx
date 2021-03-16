import { List } from 'antd';

import _MIList from './list';

type ListType = typeof List;

interface MIListType extends ListType {
  Item: typeof List.Item;
}

const MIList = _MIList as MIListType;
MIList.Item = List.Item;

export default MIList;
