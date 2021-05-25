import React from 'react';
import { DatePicker } from '@medisys/component';
import { defaultFormat } from './utils';
import RangePicker from './rangePicker';
type ComponentProps = React.ComponentProps<typeof DatePicker>;

const MIDatePicker = (props: ComponentProps) => {
  return <DatePicker format={defaultFormat} {...props} />;
};

MIDatePicker.RangePicker = RangePicker;

export default MIDatePicker;
