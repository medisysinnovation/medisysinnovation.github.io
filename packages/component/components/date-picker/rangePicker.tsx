import React, { useEffect, useState } from 'react';
import moment from 'moment';
// import { useWhyDidYouUpdate, useEventListener } from 'ahooks';

import { DatePicker } from 'antd';
import { defaultFormat } from './utils';

type ComponentProps = React.ComponentProps<typeof DatePicker.RangePicker>;

export type MIRangePickerProps = ComponentProps & {
  autoTransferTime?: boolean;
  showTime?: boolean;
};

const MIRangePicker: React.FC<MIRangePickerProps> = ({
  autoTransferTime = true,
  value,
  showTime,
  ...props
}) => {
  // console.log(value, autoTransferTime, showTime);
  const [momentValue, setMomentValue] = useState();
  useEffect(() => {
    const v = value?.map(o => (moment.isMoment(o) ? o : moment(o)));
    if (v?.find(o => !o.isValid())) {
      throw new Error('Invalid moment format: ' + value);
    }

    if (autoTransferTime && !showTime) {
      let needChange = false;
      if (
        v?.[0]?.format('HH:mm:ss') !== '00:00:00' ||
        v?.[1]?.format('HH:mm:ss') !== '23:59:59'
      ) {
        needChange = true;
      }
      const converted = (v || []).map((o: any, i: number) => {
        if (i === 0) return o?.startOf('day');
        return o?.endOf('day');
      });
      if (needChange) {
        //@ts-ignore
        props.onChange(converted);
      }

      //@ts-ignore
      setMomentValue(converted);
    } else {
      //@ts-ignore
      setMomentValue(v);
    }
  }, [value]);

  return (
    <DatePicker.RangePicker
      format={defaultFormat}
      //@ts-ignore
      value={momentValue}
      //@ts-ignore
      showTime={showTime}
      {...props}
    />
  );
};

export default MIRangePicker;
