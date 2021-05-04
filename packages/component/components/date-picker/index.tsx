import _MIDatePicker from './datePicker';
import _MIRangePicker from './rangePicker';

import { DatePicker } from 'antd';

export interface DatePickerProps {
  RangePicker: typeof _MIRangePicker;
  TimePicker: typeof DatePicker.TimePicker;
  WeekPicker: typeof DatePicker.WeekPicker;
  MonthPicker: typeof DatePicker.MonthPicker;
  YearPicker: typeof DatePicker.YearPicker;
  QuarterPicker: typeof DatePicker.QuarterPicker;
}

type Props = typeof _MIDatePicker & DatePickerProps;

let MIDatePicker = _MIDatePicker as Props;

MIDatePicker.WeekPicker = DatePicker.WeekPicker;
MIDatePicker.MonthPicker = DatePicker.MonthPicker;
MIDatePicker.YearPicker = DatePicker.YearPicker;
MIDatePicker.RangePicker = _MIRangePicker;
MIDatePicker.TimePicker = DatePicker.TimePicker;
MIDatePicker.QuarterPicker = DatePicker.QuarterPicker;

export default MIDatePicker;
