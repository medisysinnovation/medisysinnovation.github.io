import React from 'react';
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
  return (
    <DatePicker.RangePicker
      format={defaultFormat}
      //@ts-ignore
      value={
        autoTransferTime && !showTime
          ? (value || []).map((o: any, i: number) => {
              if (i === 0) return o?.startOf('day');
              return o?.endOf('day');
            })
          : value
      }
      showTime={showTime}
      {...props}
    />
  );
};

export default MIRangePicker;
