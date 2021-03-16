import React, { useState } from 'react';
import { Select, Form as AntdForm } from 'antd';
import { Input, Form, Button, Modal } from '@medisys/component';
// import { useBoolean } from 'ahooks';

import './basic.less';
// console.log(Button);
const { Option } = Select;

const defaultFormConfig = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  initialValues: {
    note: '',
  },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Demo = () => {
  const [form] = Form.useForm();
  // const a =AntdForm.useForm();
  const onGenderChange = (value: any) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        return;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        return;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
        return;
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onRemove = () => {
    setClear(true);
  };

  const [clear, setClear] = useState(false);
  return (
    <>
      {clear ? (
        <div>Form Removed</div>
      ) : (
        <Form
          {...defaultFormConfig}
          discardCheck={true}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
        >
          <div>
            <Form.Item label="Form Status" shouldUpdate>
              {(f: any) => {
                return f.isFieldsTouched() ? (
                  <span style={{ color: 'red' }}>Dirty</span>
                ) : (
                  <span style={{ color: 'green' }}>Initial</span>
                );
              }}
            </Form.Item>
            <Form.Item name="note" label="Note" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select a option and change input text above"
                onChange={onGenderChange}
                allowClear
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.gender !== currentValues.gender
              }
            >
              {({ getFieldValue, ...rest }) => {
                return getFieldValue('gender') === 'other' ? (
                  <Form.Item
                    name="customizeGender"
                    label="Customize Gender"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                ) : null;
              }}
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button danger htmlType="submit">
                Submit
              </Button>
              <Button onClick={onReset}>Reset</Button>
              <Button danger triggerDiscard onClick={onRemove}>
                Remove form
              </Button>
            </Form.Item>
          </div>
        </Form>
      )}
    </>
  );
};

export default Demo;
