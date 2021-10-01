import React from 'react';
import { DatePicker } from 'antd';
import { defaultFormat } from './utils';
import { parseValueToMoment } from '@medisys/utils';
import RangePicker from './rangePicker';
import moment from 'moment';
type ComponentProps = React.ComponentProps<typeof DatePicker>;

const MIDatePicker = ({
  value,
  readonly,
  ...props
}: Omit<ComponentProps, 'value'> & {
  readonly?: boolean;
  value?: moment.Moment | string | null | undefined;
}) => {
  if (readonly && value && !moment(value).isValid()) return value;
  const momentValue = parseValueToMoment(value as any) as
    | moment.Moment
    | undefined;

  if (readonly) {
    return (
      //@ts-ignore
      <span>{value ? momentValue.format(props?.format || 'L') : '-'}</span>
    );
  }
  return <DatePicker format={defaultFormat} value={momentValue} {...props} />;
};

MIDatePicker.RangePicker = RangePicker;

export default MIDatePicker;
