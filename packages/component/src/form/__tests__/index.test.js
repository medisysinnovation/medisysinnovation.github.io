import React from 'react';
import { mount, render } from 'enzyme';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import scrollIntoView from 'scroll-into-view-if-needed';
import { Input, Form as AntdForm } from 'antd';
import { useBoolean } from 'ahooks';
import { getStyle } from '@medisys/utils';
import { mountTest, click, sleep } from '../../test/shared';
import Form from '..';
import Button from '../../button';
import Modal from '../../modal';
jest.mock('scroll-into-view-if-needed');

describe('Form', () => {
  mountTest(Form);
  mountTest(Form.Item);

  beforeEach(() => {
    jest.useRealTimers();
    scrollIntoView.mockReset();
  });

  const errorSpy = jest.spyOn(console, 'error').mockImplementation(e => {
    // console.log(111, e);
  });
  jest.spyOn(console, 'warn').mockImplementation(e => {});

  //@ts-ignore
  async function change(wrapper, index, value) {
    wrapper
      .find(Input)
      .at(index)
      .simulate('change', { target: { value } });
    await sleep(100);
    wrapper.update();
  }

  describe('noStyle Form.Item', () => {
    it('work', async () => {
      const onChange = jest.fn();

      const wrapper = mount(
        <Form>
          <Form.Item>
            <Form.Item name="test" rules={[{ required: true }]}>
              <Input onChange={onChange} />
            </Form.Item>
          </Form.Item>
        </Form>,
      );

      await change(wrapper, 0, '');
      expect(wrapper.find('.ant-form-item-explain').length).toBeTruthy();
      expect(wrapper.find('.ant-form-item-has-error').length).toBeTruthy();
      expect(onChange).toHaveBeenCalled();
    });

    it('noStyle should not work when hidden', () => {
      const wrapper = mount(
        <Form>
          <Form.Item name="light" hidden noStyle>
            <Input />
          </Form.Item>
        </Form>,
      );
      expect(wrapper).toMatchRenderedSnapshot();
    });

    it('should clean up', async () => {
      const Demo = () => {
        const [form] = Form.useForm();

        return (
          <Form form={form} initialValues={{ aaa: '2' }}>
            <Form.Item name="aaa">
              <Input
                onChange={async () => {
                  await sleep(0);
                  try {
                    await form.validateFields();
                  } catch (e) {
                    // do nothing
                  }
                }}
              />
            </Form.Item>
            <Form.Item shouldUpdate noStyle>
              {() => {
                const aaa = form.getFieldValue('aaa');

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
          </Form>
        );
      };

      const wrapper = mount(<Demo />);
      await change(wrapper, 0, '1');
      expect(wrapper.find('.ant-form-item-explain').text()).toEqual('aaa');
      await change(wrapper, 0, '2');
      expect(wrapper.find('.ant-form-item-explain').text()).toEqual('ccc');
      await change(wrapper, 0, '1');
      expect(wrapper.find('.ant-form-item-explain').text()).toEqual('aaa');
    });
  });

  it('`shouldUpdate` should work with render props', () => {
    mount(
      <Form>
        <Form.Item>{() => null}</Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Form.Item] `children` of render props only work with `shouldUpdate` or `dependencies`.',
    );
  });

  it('`name` should not work with render props', () => {
    mount(
      <Form discardCheck>
        <Form.Item name="test" shouldUpdate>
          {() => null}
        </Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      "Warning: [antd: Form.Item] Do not use `name` with `children` of render props since it's not a field.",
    );
  });

  const getForm = () => {
    const [form] = Form.useForm();
    return {
      props: { form },
      getForm: () => form,
    };
  };

  const refForm = () => {
    let form;
    return {
      props: {
        ref: instance => {
          form = instance;
        },
      },
      getForm: () => form,
    };
  };

  describe('scrollToField', () => {
    function test(name, genForm) {
      it(name, () => {
        let callGetForm;

        const Demo = () => {
          const { props, getForm } = genForm();
          callGetForm = getForm;

          return (
            <Form name="scroll" {...props}>
              <Form.Item name="test">
                <Input />
              </Form.Item>
            </Form>
          );
        };

        const wrapper = mount(<Demo />, { attachTo: document.body });

        expect(scrollIntoView).not.toHaveBeenCalled();
        const form = callGetForm();
        form.scrollToField('test', {
          block: 'start',
        });

        const inputNode = document.getElementById('scroll_test');
        expect(scrollIntoView).toHaveBeenCalledWith(inputNode, {
          block: 'start',
          scrollMode: 'if-needed',
        });

        wrapper.unmount();
      });
    }

    // hooks
    test('useForm', getForm);

    // ref
    test('ref', refForm);
  });

  const SampleForm = props => (
    <Form discardCheck name="dirtyForm" {...props}>
      <Form.Item name="field1">
        <Input />
      </Form.Item>
      <Button triggerDiscard name="discard">
        Discard
      </Button>
    </Form>
  );

  describe('dirty check', () => {
    function test(name, genForm) {
      it(name, async () => {
        const Demo = () => {
          const { props } = genForm();
          return (
            <Router>
              <div id="test-root">
                <nav>
                  <ul>
                    <li>
                      <Link to="/">[Form]</Link>
                    </li>
                    <li>
                      <Link id="linkAntherPage" to="/anotherpage">
                        [Another page]
                      </Link>
                    </li>
                  </ul>
                </nav>

                <Switch>
                  <Route path="/anotherpage">
                    <div>Another Page</div>
                  </Route>

                  <Route path="/">
                    <SampleForm {...props} />
                  </Route>
                </Switch>
              </div>
            </Router>
          );
        };

        const wrapper = mount(<Demo />, { attachTo: document.body });
        wrapper.find('button').simulate('click');
        expect(document.querySelector('.ant-modal-wrap')).toBeNull();
        await change(wrapper, 0, 'updated');
        const inputNode = document.getElementById('dirtyForm_field1');
        expect(inputNode.value).toBe('updated');

        wrapper.find('button').simulate('click');

        await sleep(100);
        expect(document.querySelector('.ant-modal-wrap')).not.toBeNull();

        click('.ant-modal-confirm-btns button:nth-child(1)');
        await sleep(100);

        expect(document.querySelector('.ant-modal-wrap')).toBeNull();

        click('#linkAntherPage');
        await sleep(100);

        expect(document.querySelector('.ant-modal-wrap')).not.toBeNull();

        wrapper.unmount();
      });
    }

    // hooks
    test('useForm', getForm);

    // ref
    test('ref', refForm);
  });

  describe('dirty check form inside modal', () => {
    function test(name, genForm) {
      it(name, async () => {
        const Demo = () => {
          const { props } = genForm();
          const [state, { toggle, setTrue, setFalse }] = useBoolean(false);

          return (
            <>
              <Button
                onClick={() => {
                  setTrue();
                }}
              >
                Show Modal
              </Button>
              <Modal
                visible={state}
                onCancel={() => {
                  setFalse();
                }}
                onOk={() => {
                  setFalse();
                }}
              >
                <SampleForm {...props} />
              </Modal>
            </>
          );
        };

        const wrapper = mount(<Demo />, { attachTo: document.body });
        wrapper.find('button').simulate('click');
        expect(document.querySelector('.ant-modal-wrap')).not.toBeNull();

        click('.ant-modal-footer button:nth-child(1)');
        await sleep(100);
        expect(
          getStyle(document.body.querySelector('.ant-modal-wrap'), 'display'),
        ).toBe('none');

        wrapper
          .find('button')
          .at(0)
          .simulate('click');

        await change(wrapper, 0, 'updated');
        const inputNode = document.getElementById('dirtyForm_field1');
        expect(inputNode.value).toBe('updated');

        //Click cancel button
        click('.ant-modal-footer button:nth-child(1)');
        await sleep(100);
        expect(
          getStyle(document.body.querySelector('.ant-modal-wrap'), 'display'),
        ).toBe('block');

        expect(
          getStyle(
            document.body.querySelector('.ant-modal-confirm-body-wrapper'),
            'display',
          ),
        ).toBe('block');

        //Click confirm
        click('.ant-modal-confirm-btns button:nth-child(2)');
        await sleep(100);

        expect(
          getStyle(document.body.querySelector('.ant-modal-wrap'), 'display'),
        ).not.toBe('block');

        expect(
          getStyle(
            document.body.querySelector('.ant-modal-confirm-body-wrapper'),
            'display',
          ),
        ).not.toBe('block');

        wrapper.unmount();
      });
    }

    // hooks
    test('useForm', getForm);

    // ref
    test('ref', refForm);
  });
});
