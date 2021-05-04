import React, { useState } from 'react';
import moment from 'moment';
import { abc } from '@medisys/test';
import { DatePicker, Form } from '@medisys/component';
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
          dateFilter: [moment(), moment()],
        }}
      >
        <Form.Item shouldUpdate>
          {({ getFieldsValue }) => {
            const { dateFilter = [], autoTransfer } = getFieldsValue();
            // console.log(dateFilter, autoTransfer);
            return (
              <div>
                Date selected : {dateFilter[0]?.format()} to{' '}
                {dateFilter[1]?.format()}
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
