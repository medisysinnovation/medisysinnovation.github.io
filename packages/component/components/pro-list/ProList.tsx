import ProList from '@ant-design/pro-list';
import { ProListProps } from '@ant-design/pro-list/es/index';
const MIProList = <
  RecordType extends Record<string, any>,
  U extends Record<string, any> = Record<string, any>
>(
  props: ProListProps<RecordType, U>,
) => {
  return <ProList<RecordType, U> {...props} />;
};
export default MIProList;
