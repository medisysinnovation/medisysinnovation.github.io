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
}: ComponentProps & {
  readonly?: boolean;
}) => {
  const momentValue = parseValueToMoment(value as any) as moment.Moment;

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
