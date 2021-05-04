import React from 'react';
// import { useWhyDidYouUpdate, useEventListener } from 'ahooks';

import { DatePicker } from 'antd';

type ComponentProps = React.ComponentProps<typeof DatePicker>;

export type MIDatePickerProps = ComponentProps & {
  triggerDiscard?: boolean;
};

const MIDatePicker: React.FC<MIDatePickerProps> = ({ ...props }) => {
  return <DatePicker {...props} />;
};

export default MIDatePicker;
