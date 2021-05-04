import React from 'react';
// import { useWhyDidYouUpdate, useEventListener } from 'ahooks';

import { DatePicker } from 'antd';

type ComponentProps = React.ComponentProps<typeof DatePicker.RangePicker>;

export type MIRangePickerProps = ComponentProps & {
  autoTransferTime?: boolean;
};

const MIRangePicker: React.FC<MIRangePickerProps> = ({
  autoTransferTime = true,
  value,
  ...props
}) => {
  // console.log(value);
  return (
    <DatePicker.RangePicker
      //@ts-ignore
      value={
        autoTransferTime
          ? (value || []).map((o: any, i: number) => {
              if (i === 0) return o?.startOf('day');
              return o?.endOf('day');
            })
          : value
      }
      {...props}
    />
  );
};

export default MIRangePicker;
