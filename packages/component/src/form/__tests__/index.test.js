import React from 'react';
import { mount, render } from 'enzyme';
import scrollIntoView from 'scroll-into-view-if-needed';
import { Input, Form as AntdForm } from 'antd';
import mountTest from '../../../test/shared/mountTest';
import { sleep } from '../../../test/utils';
import Form from '..';
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
      <Form enableDirtyCheck>
        <Form.Item name="test" shouldUpdate>
          {() => null}
        </Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      "Warning: [antd: Form.Item] Do not use `name` with `children` of render props since it's not a field.",
    );
  });

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
    test('useForm', () => {
      const [form] = Form.useForm();
      return {
        props: { form },
        getForm: () => form,
      };
    });

    // ref
    test('ref', () => {
      let form;
      return {
        props: {
          ref: instance => {
            form = instance;
          },
        },
        getForm: () => form,
      };
    });
  });
});
