/**
 * debug: true
 */

import React, { useState, useRef } from 'react';
import { Input, Select } from 'antd';
import { Form, Button } from '@medisys/component';
import { FormInstance } from 'antd/lib/form';
const Test = () => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      enableDirtyCheck
      name="test_form"
      initialValues={{ aaa: '2' }}
    >
      <Button
        onClick={() => {
          form.scrollToField('ddd', {
            // block: 'nearest',
          });
        }}
      >
        Scroll
      </Button>
      <Form.Item name="aaa">
        <Input
          onChange={() => {
            setTimeout(form.validateFields, 0);
          }}
        />
      </Form.Item>
      <Form.Item shouldUpdate noStyle>
        {() => {
          const aaa = form.getFieldValue('aaa');
          console.log(aaa);
          if (aaa === '1') {
            return (
              <Form.Item
                name="bbb"
                rules={[{ required: true, message: 'aaa' }]}
              >
                <Input />
              </Form.Item>
            );
          }

          return (
            <Form.Item>
              <Form.Item
                name="ccc"
                rules={[{ required: true, message: 'ccc' }]}
                noStyle
              >
                <Input />
              </Form.Item>
            </Form.Item>
          );
        }}
      </Form.Item>
      <Form.Item name="ddd" style={{ marginTop: 1000, marginBottom: 1000 }}>
        <Input
          onChange={() => {
            setTimeout(form.validateFields, 0);
          }}
        />
      </Form.Item>
    </Form>
  );
};

function FancyInput(props, ref) {
  React.useImperativeHandle(ref, ee => {
    return {
      a: 1234,
    };
  });
  return <input {...props} />;
}
const FancyInput2 = React.forwardRef(FancyInput);

class ClassTest extends React.Component {
  formRef = React.createRef<FormInstance>();
  testRef = React.createRef();
  divRef = React.createRef();
  state = {
    a: 1,
  };
  render() {
    console.log(this.formRef, this.testRef);

    return (
      <div ref={this.divRef}>
        <Form
          enableDirtyCheck
          ref={this.formRef}
          name="test_form"
          // initialValues={{ aaa: '2' }}
        >
          <FancyInput2
            ref={this.testRef}
            value={this.state.a}
            onChange={e => {
              this.setState({
                a: e.target.value,
              });
            }}
          />
          <Form.Item name="ddd" style={{ marginTop: 1000, marginBottom: 1000 }}>
            <Input onChange={() => {}} />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default ClassTest;
