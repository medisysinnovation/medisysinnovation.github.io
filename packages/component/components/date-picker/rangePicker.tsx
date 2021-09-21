import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useIntl } from '../locale';

// import { useWhyDidYouUpdate, useEventListener } from 'ahooks';

import { DatePicker } from 'antd';
import { defaultFormat } from './utils';

type ComponentProps = React.ComponentProps<typeof DatePicker.RangePicker>;

export type MIRangePickerProps = ComponentProps & {
  autoTransformTime?: boolean;
  showTime?: boolean;
};

const MIRangePicker: React.FC<MIRangePickerProps> = ({
  autoTransformTime = true,
  value,
  showTime,
  ...props
}) => {
  const intl = useIntl();

  // console.log(value, autoTransformTime, showTime);
  const [momentValue, setMomentValue] = useState();
  useEffect(() => {
    const v = value
      ?.map(o => (moment.isMoment(o) ? o : o ? moment(o) : o))
      .map(o => (o?.isValid() ? o : undefined));

    if (autoTransformTime && !showTime) {
      let needChange = false;
      if (
        v?.length === 2 &&
        ((v?.[0] && v?.[0]?.format('HH:mm:ss') !== '00:00:00') ||
          (v?.[1] && v?.[1]?.format('HH:mm:ss') !== '23:59:59'))
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
      placeholder={[
        intl.getMessage('form.rangeDatepickerStart', 'Select start date'),
        intl.getMessage('form.rangeDatepickerEnd', 'Select end date'),
      ]}
      {...props}
    />
  );
};

export default MIRangePicker;
