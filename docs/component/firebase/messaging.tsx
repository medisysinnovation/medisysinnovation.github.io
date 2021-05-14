import React, { useEffect, useState, useCallback } from 'react';
import request from 'umi-request';
import {
  Input,
  Select,
  ConfigProvider,
  Divider,
  message,
  notification,
} from 'antd';
import { Form, Button, Modal } from '@medisys/component';
import {
  subscribeTopicAsync,
  initFirebaseMessagingAsync,
  sendMessageAsync,
  unsubscribeTopicAsync,
} from '@medisys/notification';

import { useBoolean } from 'ahooks';

const MessagingDemo = () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean(false);
  const [
    state2,
    { toggle: toggle2, setTrue: setTrue2, setFalse: setFalse2 },
  ] = useBoolean(false);
  const [form] = Form.useForm();

  const [registrationToken, setRegistrationToken] = useState('');
  const subscribeTopic = useCallback(
    token => {
      const topic = form.getFieldValue('topic');
      subscribeTopicAsync({
        token: typeof token === 'string' ? token : registrationToken,
        topic,
      })
        .then(r => {
          setTrue2();
        })
        .catch(error => {
          message.error('Fail to subscribe topic: ' + topic);
          console.log(error);
        });
    },
    [registrationToken, form],
  );
  const unsubscribeTopic = useCallback(
    e => {
      const topic = form.getFieldValue('topic');

      console.log(e);
      unsubscribeTopicAsync({
        token: registrationToken,
        topic,
      })
        .then(r => {
          setFalse2();
        })
        .catch(error => {
          message.error('Fail to unsubscribe topic: ' + topic);
          console.log(error);
        });
    },
    [registrationToken, form],
  );
  useEffect(() => {
    initFirebaseMessagingAsync({
      onGetFirebaseConfig: async () => {
        const response = await request(
          'https://localhost:44397/api/FirebaseMessaging/Config',
        );
        return response?.data;
      },
      onGetSenderToken: async () => {
        const response = await request(
          'https://localhost:44397/api/FirebaseMessaging/SenderToken',
        );
        form.setFieldsValue({
          senderToken: response?.data,
        });
        return response?.data;
      },
      onTokenReceived: async token => {
        setTrue();
        setRegistrationToken(token);

        subscribeTopic(token);
      },
      onMessageReceived: payload => {
        const { data, from, priority, ...resetProps } = payload;

        const { notification, ...restData } = data || {};
        const msg = `${JSON.stringify(payload)}`;
        const v = form.getFieldsValue();
        form.setFieldsValue({
          ...v,
          receiveMessage: (v.receiveMessage || '') + msg + '\n',
        });
      },
    }).catch(error => {
      message.error(error?.message);
    });
  }, []);

  return (
    <>
      <div>{state && 'Firebase Messaging active'}</div>
      <div>{state2 && 'Topic subscribed '}</div>

      <Form
        form={form}
        discardCheck={false}
        initialValues={{
          topic: 'MyTestTopic',
        }}
        onFinish={values => {
          sendMessageAsync({
            identity: { topic: form.getFieldValue('topic') },
            title: 'A message from Medisys Lab',
            data: {
              content: values.messageBody,
              notification: {
                body: 'I am a testing message body',
              },
            },
          }).catch(error => {
            message.error(
              'Fail to send message, check your sender token is valid',
            );
          });
        }}
      >
        <Form.Item name="receiveMessage" rules={[{ required: true }]}>
          <Input placeholder="Input topic here" />
        </Form.Item>
        <Form.Item name="receiveMessage">
          <Input.TextArea
            readOnly
            placeholder="Message received display here"
            rows={15}
          />
        </Form.Item>
        <Form.Item name="senderToken" rules={[{ required: true }]}>
          <Input placeholder="Place sender token here" />
        </Form.Item>
        <Form.Item name="messageBody" rules={[{ required: true }]}>
          <Input.TextArea
            placeholder="Type in the message you want to send"
            rows={4}
          />
        </Form.Item>
        <Button onClick={form.submit}>Send Message</Button>
        <Button disabled={state2} onClick={subscribeTopic}>
          Subscribe Topic
        </Button>
        <Button disabled={!state2} onClick={unsubscribeTopic}>
          Unsubscribe Topic
        </Button>
      </Form>
    </>
  );
};

export default MessagingDemo;
