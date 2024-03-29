import React, { useState } from 'react';
import moment from 'moment';
import { DatePicker, Form, ProDatePicker } from '@medisys/component';

export default function() {
  const [form] = Form.useForm();
  return (
    <div>
      <Form
        form={form}
        initialValues={{
          stringDate: '', //'2099-12-30T00:00:00+08:00', //moment(),
          momentDate: moment('2099-12-30T00:00:00+08:00'),
        }}
      >
        <Form.Item name="stringDate">
          <DatePicker />
        </Form.Item>
        <Form.Item name="momentDate">
          <DatePicker showTime />
          <DatePicker showTime readonly />
        </Form.Item>
        <ProDatePicker fieldProps={{ showTime: true }} />
      </Form>
    </div>
  );
}
