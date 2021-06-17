import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import { defaultFormat } from './utils';
import RangePicker from './rangePicker';
import moment from 'moment';
type ComponentProps = React.ComponentProps<typeof DatePicker>;

const MIDatePicker = ({ value, ...props }: ComponentProps) => {
  const [momentValue, setMomentValue] = useState(
    value?.isValid ? value : undefined,
  );
  useEffect(() => {
    if (!value?.isValid) {
      const v = moment(value);
      if (!v.isValid() && !!value) {
        throw new Error('Invalid moment format: ' + value);
      }
      //@ts-ignore
      props.onChange(v);
      //@ts-ignore
      setMomentValue(v);
    } else {
      setMomentValue(value);
    }
  }, [value]);
  return <DatePicker format={defaultFormat} value={momentValue} {...props} />;
};

MIDatePicker.RangePicker = RangePicker;

export default MIDatePicker;
