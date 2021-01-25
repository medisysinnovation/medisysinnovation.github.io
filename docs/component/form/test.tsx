/**
 * debug: true
 */

import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Input, Select } from 'antd';
import { Form, Button } from '@medisys/component';
import { FormInstance } from 'antd/lib/form';
const Test = () => {
  const [form] = Form.useForm();
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">[Form]</Link>
            </li>
            <li>
              <Link to="/anotherpage">[Another page]</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/anotherpage">
            <div>Another Page</div>
          </Route>

          <Route path="/">
            <Form discardCheck name="dirtyForm">
              <Form.Item name="field1">
                <Input />
              </Form.Item>
              <Button triggerDiscard name="discard">
                Discard
              </Button>
            </Form>
          </Route>
        </Switch>
      </div>
    </Router>
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
          discardCheck
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
          <Form.Item
            name="ddd"
            // style={{ marginTop: 1000, marginBottom: 1000 }}
          >
            <Input onChange={() => {}} />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Test;
