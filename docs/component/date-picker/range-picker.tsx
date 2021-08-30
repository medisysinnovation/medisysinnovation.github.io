import React, { useState } from 'react';
import moment from 'moment';
import { DatePicker, Form, ProRangeDatePicker } from '@medisys/component';
import { Switch } from 'antd';

const { RangePicker } = DatePicker;
export default function() {
  const [form] = Form.useForm();
  const [autoTransform, setAutoTransfer] = useState(true);
  return (
    <div>
      <Switch
        checkedChildren="True"
        unCheckedChildren="False"
        checked={autoTransform}
        onChange={v => {
          setAutoTransfer(v);
        }}
      />
      <Form
        form={form}
        initialValues={{
          autoTransform: true,
          dateFilter: ['1990-01-01T01:01:00+08:00', moment('2021-01-01')], // ['1990-01-01T01:01:00+08:00', moment()],
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
            allowEmpty={[true, true]}
            autoTransformTime={autoTransform}
            // autoTransformTime={}
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
        <ProRangeDatePicker
          name="dateFilter"
          fieldProps={{
            allowEmpty: [true, true],
          }}
        />
        {/* <Form.Item shouldUpdate>
          {form => {
            const { dateFilter = [], autoTransform } = form.getFieldsValue();
            console.log(dateFilter, autoTransform);
            return (
              <RangePicker
                value={dateFilter}
                // autoTransformTime={}
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
