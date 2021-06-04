import app from 'firebase/app';
import 'firebase/messaging';

import { FirebaseOptions } from '@firebase/app-types';
import request from 'umi-request';
//Firebase messaging restful api
//https://documenter.getpostman.com/view/5523742/RzZFBG7C#3864fe44-5434-43d1-a5a0-a46ac51bb5a8
let fcmConfig: FirebaseConfig | undefined = undefined;
let fcmSendMessageToken = '';
export const initFirebaseConfig = (option: FirebaseOptions) => {
  if (!app.apps.length) {
    app.initializeApp(option);
  }
};

export type ReceivedMessagePayload = {
  data?: MessageData;
  priority?: 'low' | 'normal' | 'high';
  from: string;
};

export type FirebaseConfig = FirebaseOptions & {
  vapidKey?: string;
  serverKey?: string;
  onGetFirebaseConfigAsync?: () => Promise<FirebaseConfig>;
  onMessageReceived?: (payload: ReceivedMessagePayload) => void;
  onGetSenderTokenAsync?: () => Promise<string>;
  onTokenReceived?: (token: string) => boolean;
};

export const initFirebaseMessagingAsync = async ({
  onTokenReceived,
  onGetSenderTokenAsync,
  onMessageReceived = () => {},
  onGetFirebaseConfigAsync,
  ...config
}: FirebaseConfig) => {
  if (onGetFirebaseConfigAsync) {
    fcmConfig = await onGetFirebaseConfigAsync!();
    const { vapidKey, serverKey, ...otherConfig } = fcmConfig;

    initFirebaseConfig({
      ...fcmConfig,
      ...config,
    });
  } else {
    initFirebaseConfig(config);
  }

  const messaging = app.messaging();
  try {
    const currentToken = await messaging.getToken({
      vapidKey: config.vapidKey || fcmConfig!.vapidKey,
    });
    if (currentToken) {
      let proceed = true;
      if (onTokenReceived) {
        proceed = onTokenReceived(currentToken) ?? true;
      }
      //@ts-ignore
      messaging?.swRegistration?.active.postMessage({
        type: 'init',
        data: {
          ...fcmConfig,
          ...config,
        },
      });
      navigator.serviceWorker.addEventListener('message', event => {
        const { data, source } = event;
        //@ts-ignore
        if (source!.scriptURL.indexOf('firebase-messaging-sw') > 0) {
          if (data.messageType === 'push-received') {
            let parsedData = data?.data?.data;
            try {
              parsedData = JSON.parse(parsedData);
            } catch (error) {
              console.error(`not able to parse payload ${parsedData}`);
            }
            onMessageReceived({
              ...data,
              ...data.data,
              data: parsedData,
            });
          } else if (
            data.firebaseMessaging?.type === 'background-push-received'
          ) {
            onMessageReceived({
              ...data.firebaseMessaging?.payload,
              messageType: data.firebaseMessaging?.type,
            });
          }
        }
      });
      if (onGetSenderTokenAsync) {
        const _senderToken = await onGetSenderTokenAsync();
        if (_senderToken) {
          fcmSendMessageToken = _senderToken;
        }
      }
    } else {
      throw new Error(
        'No registration token available. Request permission to generate one.',
      );
    }
  } catch (error) {
    throw new Error('An error occurred while retrieving token. \r\n' + error);
  }
};

export const subscribeTopicAsync = async ({
  token,
  topic,
  serverKey,
}: {
  token: string;
  topic: string;
  serverKey?: string;
}) => {
  //Subscribe topic
  const r = await request.post(
    `https://iid.googleapis.com/iid/v1:batchAdd`,
    // `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`,
    {
      headers: {
        Authorization: `Bearer ${serverKey || fcmConfig?.serverKey}`,
      },
      body: JSON.stringify({
        to: '/topics/' + topic,
        registration_tokens: [token],
      }),
    },
  );
  if (r?.results[0]?.error) {
    throw new Error(
      'Subscript topic ' + topic + ' fail:' + r.results[0]?.error,
    );
  }
  // setTrue2();
};

export const unsubscribeTopicAsync = async ({
  token,
  topic,
  serverKey,
}: {
  token: string;
  topic: string;
  serverKey: string;
}) => {
  //Subscribe topic
  const r = await request.post(
    `https://iid.googleapis.com/iid/v1:batchRemove`, //`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`,
    {
      headers: {
        Authorization: `Bearer ${serverKey || fcmConfig?.serverKey}`,
      },
      body: JSON.stringify({
        to: '/topics/' + topic,
        registration_tokens: [token],
      }),
    },
  );
  // console.log(r);
  // setTrue2();
};

export type WebPushNotificationAction = {
  action: string;
  title: string;
  //Path of icon '/images/pet.jpg'
  icon: string;
};

export type WebPushNotification = {
  title?: string;
  body?: string;
  tag?: string;
  silent?: boolean;
  renotify?: boolean;
  requireInteraction?: boolean;
  actions?: WebPushNotificationAction[];
};

export type MessageData = Record<string, any> & {
  notification?: WebPushNotification;
};

export type MessagePayload = ReceivedMessagePayload & {
  identity: { topic: string } | { token: string };
  title: string;
  projectId?: string;
  senderToken?: string;
  messagePayload?: any;
};

export const sendMessageAsync = async ({
  identity,
  projectId,
  data = {},
  priority = 'normal',
  title = 'You got a message',
  senderToken,
  messagePayload = {},
}: MessagePayload) => {
  const payload = {
    message: {
      ...messagePayload,
      // "token" : <token of destination app>,
      ...identity,
      data: {
        title: title,
        priority,
        data: JSON.stringify(data),
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
      // webpush: {
      //   headers: {
      //     Urgency: priority,
      //   },
      //   // notification: {
      //   //   topic,
      //   //   // body: JSON.stringify(params),
      //   //   // requireInteraction: 'true',
      //   //   // badge: '/badge-icon.png',
      //   //   payload: {
      //   //     sender: user.data.clinicianProfile.name,
      //   //     senderId: user.data.id,
      //   //     timestamp: Date.now(),
      //   //     ...params,
      //   //   },
      //   // },
      // },
    },
  };
  // console.log(params)
  const send = async () => {
    const r = await request.post(
      `https://fcm.googleapis.com/v1/projects/${projectId ||
        fcmConfig!.projectId}/messages:send`,
      // `https://fcm.googleapis.com/fcm/send`,
      {
        headers: {
          Authorization: `Bearer ${senderToken || fcmSendMessageToken}`,
          // project_id: projectId,
        },
        data: payload,
      },
    );
    // console.log(r);
    return r;
  };

  const v = await send();
  // console.log(v)
  if (v && !v.success) {
    const { response } = v;
    if (
      response &&
      response.responseJSON &&
      response.responseJSON.error &&
      (response.responseJSON.error.code === 401 ||
        (Array.isArray(response.responseJSON.error.details) &&
          response.responseJSON.error.details.find(
            (o: any) => o.errorCode === 'UNAUTHENTICATED',
          ))) // UNREGISTERED
    ) {
      throw new Error('401: Invalid sender token, get new token and retry');
    }
  }
};
