import React, { useEffect, useState } from 'react';
import request from 'umi-request';
import { Input, Select, ConfigProvider, Divider, message } from 'antd';
import { Form, Button, Modal } from '@medisys/component';
import {
  initFirebaseConfig,
  getFirebaseMessaging,
} from '@medisys/notification';

import { useBoolean } from 'ahooks';
let testLoadingState = false;
// console.dir(ConfigProvider);
// console.dir(ConfigProvider.ConfigContext.Consumer);
const config = {
  apiKey: 'AIzaSyCR6K6Irj6sWTyDsU6FW2d0alFnQLwrvgQ',
  authDomain: 'banchoon-wms-dev.firebaseapp.com',
  projectId: 'banchoon-wms-dev',
  storageBucket: 'banchoon-wms-dev.appspot.com',
  messagingSenderId: '426316456594',
  appId: '1:426316456594:web:a3f2a3c438cc49edd07c4b',
  measurementId: 'G-XLJRZ51QQJ',
  vapidKey:
    'BLnUvd6tLdxlr101qE8cNuAVf3gTf49qUB2v5fgX6W-dWyN-Zd8CjtRYpduNxwInrThyrin9KvD6dUWbFna8fmc',
};
const firebaseProjectName = 'banchoon-wms-dev';
// const senderToken =
//   'ya29.c.Kp8B_gfpd8-DbkwY59w6gM06qM4p2s0NTTctfFzAYMG9tZZh2qvGzqDNZU1HolrpMzhm0hOqWrTP9cBlEbUt1DTChu2JwNZerMbyM0ipOAZ80pbI0QAqlEF8t1CrwNcBUQZ94TeJ2a1BeqBlYSzQ7Rux9xCi2BtGnXcTFxqA9LJNrYqHX7pl4NsgnEeIktgKxp9ku9WMBsPdI1ZSj-KqMFpG';
// 'ya29.c.Kp8B_gfvX0IsCyUOBp5CJvYEDoRCtlvfln7ov401Utt4MI4g92JyWeSr8P7HXftlJ4eEDyfJPeETqA9JYQS_kjtBkzHDvdfU-iwCXjU4ZrZ74F9uBnGc0AU2vJF1ycoprVFIj_vV9HKwzlnKuKeo7g-fq_yxoNN3uQAspe75fQnkjczTQyLT9OwwKnsiFmmF-B_MocYBQuEmUB7K6Jfa45Gj';
const serverKey =
  'AAAAY0Jw4pI:APA91bF5vZySVl5sywsYtCr5HBh8Uw8rjEKE8iwIpHqs6sBkznacIiJvoRBhBB6eUuDAUrlX8ofx0YYEFxVY5_0heiuCSH0WBQNKn1zzoM2zlXm3JInA18s1RwYRf69EHh-S_YkwOD0A';
const topic = 'TEST_BC';

const _sendNotification = async (
  identity,
  params,
  option = {
    includeSenderInfo: true,
    stringBody: true,
    priority: 'normal',
    messagePayload: {},
  },
) => {
  const { priority, messagePayload } = option;
  const { title, senderToken, ...resetData } = params;
  const payload = {
    message: {
      ...messagePayload,
      // "token" : <token of destination app>,
      ...identity,
      data: {
        title: params.title,
        priority,
        data: JSON.stringify({
          system: {
            // sender: user.data.clinicianProfile.name,
            // senderId: user.data.id,
            // redirect: '/reception/queue',
            timestamp: Date.now(),
          },
          ...resetData,
        }),
      },
      android: {
        notification: {
          sound: 'default',
          click_action: 'FLUTTER_NOTIFICATION_CLICK',
        },
      },
      // content_available: false,
      // data: {
      //   title: 'FCM Message',
      //   body: 'This is an FCM Message',
      //   icon:
      //     'https://shortcut-test2.s3.amazonaws.com/uploads/role_image/attachment/10461/thumb_image.jpg',
      //   link: 'https://yourapp.com/somewhere',
      // },
      // notification: {
      //   title: 'FCM Message 2',
      //   body: 'FCM Message Body',
      //   clickAction: 'http://localhost:30321/',
      // },
      webpush: {
        headers: {
          Urgency: priority,
        },
        // notification: {
        //   topic,
        //   // body: JSON.stringify(params),
        //   // requireInteraction: 'true',
        //   // badge: '/badge-icon.png',
        //   payload: {
        //     sender: user.data.clinicianProfile.name,
        //     senderId: user.data.id,
        //     timestamp: Date.now(),
        //     ...params,
        //   },
        // },
      },
    },
  };
  // console.log(params)
  try {
    const send = async () => {
      const r = await request.post(
        `https://fcm.googleapis.com/v1/projects/${firebaseProjectName}/messages:send`,
        {
          headers: {
            Authorization: `Bearer ${senderToken}`,
          },
          data: payload,
        },
      );
      console.log(r);
      return r;
    };

    const v = await send();
    // console.log(v)
    if (v && !v.success) {
      const { response } = v;
      console.log(response);
      if (
        response &&
        response.responseJSON &&
        response.responseJSON.error &&
        (response.responseJSON.error.code === 401 ||
          (Array.isArray(response.responseJSON.error.details) &&
            response.responseJSON.error.details.find(
              o => o.errorCode === 'UNAUTHENTICATED',
            ))) // UNREGISTERED
      ) {
        // await debounceGetFBAdminKey();
        // setTimeout(() => {
        //   if (fbAdminKey) {
        //     send();
        //   } else {
        //     notification.error({
        //       message:
        //         'Not able to connect to patient, please refresh page and retry',
        //     });
        //   }
        // }, 3000);
      }
    }
  } catch (error) {
    message.error('Fail to send message, check your sender token is valid');
    console.log(`send error:${error}`);
  }
};

const MessagingDemo = () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean(false);
  const [
    state2,
    { toggle: toggle2, setTrue: setTrue2, setFalse: setFalse2 },
  ] = useBoolean(false);

  useEffect(() => {
    const init = async () => {
      initFirebaseConfig(config);

      const messaging = getFirebaseMessaging();
      console.log(messaging);
      messaging.onMessage(({ data, from, priority }) => {
        const { notification, ...restData } = data || {};
        const msg = `${JSON.stringify(restData)}`;
        const v = form.getFieldsValue();
        form.setFieldsValue({
          ...v,
          receiveMessage: (v.receiveMessage || '') + msg + '\n',
        });
        console.log(msg, data);
      });
      messaging
        .getToken({
          vapidKey: config.vapidKey,
        })
        .then(currentToken => {
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
            setTrue();
            localStorage.setItem('fbmsg_t', currentToken);
            messaging?.swRegistration?.active.postMessage({
              type: 'init',
              data: config,
            });
            console.log(currentToken);
          } else {
            // Show permission request UI
            console.log(
              'No registration token available. Request permission to generate one.',
            );
            // ...
          }
        })
        .catch(err => {
          console.log('An error occurred while retrieving token. ', err);
          // ...
        });

      //Subscribe topic
      const r = await request.post(
        `https://iid.googleapis.com/iid/v1/${localStorage.getItem(
          'fbmsg_t',
        )}/rel/topics/${topic}`,
        {
          headers: {
            Authorization: `Bearer ${serverKey}`,
          },
        },
      );
      console.log(r);
      setTrue2();
    };
    init();
  }, []);

  const [form] = Form.useForm();

  return (
    <>
      <div>{state && 'Firebase Messaging active'}</div>
      <div>{state2 && 'Topic subscribed '}</div>

      <Form
        form={form}
        onFinish={values => {
          _sendNotification(
            {
              topic,
            },
            {
              title: 'A message from Medisys Lab',
              message: values.messageBody,
              senderToken: values.senderToken,
            },
          );
        }}
      >
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
      </Form>
    </>
  );
};

export default MessagingDemo;
