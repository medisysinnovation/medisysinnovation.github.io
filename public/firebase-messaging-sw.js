importScripts('https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.5.0/firebase-messaging.js');

const omitUndefined = (obj, { allowEmpty = false, autoTrim = true } = {}) => {
  const newObj = {};
  Object.keys(obj || {}).forEach(key => {
    //@ts-ignore
    if (obj[key] !== undefined && obj[key] !== null) {
      if (typeof obj[key] === 'string' && autoTrim) {
        newObj[key] = obj[key].trim();
      } else {
        newObj[key] = obj[key];
      }
    }
  });
  if (Object.keys(newObj).length < 1) {
    return allowEmpty ? obj : undefined;
  }
  return newObj;
};

let config = {
  subscribeFCM: true,
  sessionClosed: true,
};

let defaultNotificationTemplate = {
  default: {
    title: 'You got a new message',
  },
  action: {
    title: 'default action title',
    options: {
      actions: [
        {
          action: 'action-1',
          title: 'Action 1',
          icon: '/images/demos/action-1-128x128.png',
        },
        {
          action: 'action-2',
          title: 'Action 2',
          icon: '/images/demos/action-2-128x128.png',
        },
      ],
      body: 'Test body message',
    },
  },
};

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({ includeUncontrolled: true, type: 'window' })
      .then(clientsArr => {
        console.log(event.notification);
        // If a Window tab matching the targeted URL already exists, focus that;
        const hadWindowToFocus = clientsArr.some(windowClient =>
          !event.notification.data ||
          windowClient.url === event.notification.data.url
            ? (windowClient.focus(), true)
            : false,
        );
        // Otherwise, open a new tab to the applicable URL and focus it.
        if (!hadWindowToFocus)
          clients
            .openWindow(event.notification.data?.url || config.sitePath)
            .then(windowClient => (windowClient ? windowClient.focus() : null));
      }),
  );
});

const messageHandler = async payload => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );
  // return
  const { data } = payload;
  const convertedData = data?.data ? JSON.parse(data.data) : data;
  const { notificationType, notification } = convertedData || {};

  const clients = await self.clients.matchAll({
    includeUncontrolled: true,
  });

  clients.forEach(client => {
    client.postMessage({
      firebaseMessaging: {
        type: 'background-push-received',
        payload: {
          ...data,
          data: convertedData,
        },
      },
    });
  });

  const notifyTemplate = defaultNotificationTemplate[notificationType];
  if (notifyTemplate) {
    registration.showNotification(
      data.title || notifyTemplate.title,
      notifyTemplate.options,
    );
  } else if (notification) {
    // console.log(omitUndefined(notification), notification);
    registration.showNotification(
      notification.title || data.title,
      omitUndefined(notification),
    );
  }
};

self.addEventListener('message', event => {
  const { data: eData } = event;
  const { type, data } = eData;
  // console.log(type, data);
  switch (type) {
    case 'init':
      if (!firebase.apps.length) {
        firebase.initializeApp(data);
      }
      const messaging = firebase.messaging();
      messaging.onBackgroundMessage(messageHandler);
      break;
    case 'updateFCMConfig':
      config = {
        ...config,
        ...data,
      };

      break;
    case 'updateNotificationTemplate':
      defaultNotificationTemplate = {
        ...defaultNotificationTemplate,
        ...data,
      };
      break;
    default:
      break;
  }
});
