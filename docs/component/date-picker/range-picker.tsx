import React, { useState } from 'react';
import moment from 'moment';
import { DatePicker, Form, ProRangeDatePicker } from '@medisys/component';
import { Switch } from 'antd';

const { RangePicker } = DatePicker;
export default function() {
  const [form] = Form.useForm();
  const [autoTransfer, setAutoTransfer] = useState(true);
  return (
    <div>
      <Switch
        checkedChildren="True"
        unCheckedChildren="False"
        checked={autoTransfer}
        onChange={v => {
          setAutoTransfer(v);
        }}
      />
      <Form
        form={form}
        initialValues={{
          autoTransfer: true,
          dateFilter: ['1990-01-01T01:01:00+08:00', moment()],
        }}
      >
        <Form.Item shouldUpdate>
          {({ getFieldsValue }) => {
            const { dateFilter = [] } = getFieldsValue();
            return (
              <div>
                Date selected : {dateFilter?.[0]?.format()} to{' '}
                {dateFilter?.[1]?.format()}
              </div>
            );
          }}
        </Form.Item>
        <Form.Item name="dateFilter">
          <RangePicker
            autoTransfer={autoTransfer}
            // autoTransferTime={}
            // onChange={v => {
            //   form.setFields([
            //     {
            //       name: 'dateFilter',
            //       value: v,
            //     },
            //   ]);
            //   console.log(v);
            // }}
          />
        </Form.Item>
        <ProRangeDatePicker name="dateFilter" />
        {/* <Form.Item shouldUpdate>
          {form => {
            const { dateFilter = [], autoTransfer } = form.getFieldsValue();
            console.log(dateFilter, autoTransfer);
            return (
              <RangePicker
                value={dateFilter}
                // autoTransferTime={}
                onChange={v => {
                  form.setFields([
                    {
                      name: 'dateFilter',
                      value: v,
                    },
                  ]);
                  console.log(v);
                }}
              />
            );
          }}
        </Form.Item> */}
      </Form>
    </div>
  );
}
