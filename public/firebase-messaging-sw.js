importScripts('http://www.gstatic.com/firebasejs/8.5.0/firebase-app.js');
importScripts('http://www.gstatic.com/firebasejs/8.5.0/firebase-messaging.js');

let config = {
  subscribeFCM: true,
  sessionClosed: true,
};

let notificationConfig = {
  default: {
    title: 'You got a new message from Banchoon WMS',
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

const getMobileMessage = tpc => {
  switch (tpc) {
    case 'REQUEST_VIDEO_CONSULT':
      return 'Incoming Tele-Consultation';
      break;

    default:
      return '';
  }
};

// const messageHandler=async

// messaging.onMessage((e) => {
//   console.log(e)
// })
// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
self.addEventListener('notificationclick', event => {
  console.log(event);
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({ includeUncontrolled: true, type: 'window' })
      .then(clientsArr => {
        // console.log(clientsArr)
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
  // event.waitUntil(
  //   self.clients.openWindow(
  //     event.notification.data,
  //     '_blank',
  //     'menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes',
  //   ),
  // )
});
// [END background_handler]
// self.addEventListener('install', (event) => {
//   console.log(event)
//   event.waitUntil(self.skipWaiting()) // Activate worker immediately
// })
// self.addEventListener('activate', (event) => {
//   event.waitUntil(self.clients.claim()) // Become available to all pages
// })
// service-worker.js
// let getVersionPort
// let count = 0

const messageHandler = async payload => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );
  // console.log(config)
  // if(!config.subscribeFCM)return null
  const { data, priority } = payload;
  const convertedData = data?.data ? JSON.parse(data.data) : data;
  const {
    system: { sender, redirect } = {},
    topic,
    message,
    notificationType,
    notification,
  } = convertedData || {};
  // Customize notification here
  const notificationTitle = 'You got a new message from MediTel';
  const body = message ? `[${sender}] ${message}` : getMobileMessage(topic);
  const notificationOptions = {
    // body,
    // icon: '/favicon.png',
    // data: redirect,
    silent: true,
  };
  // console.log(self, self.sessionStorage) // sessionStorage.getItem('notifications'))
  // self.postMessage({ aTopic: 'do_sendMainArrBuff' }, [
  //   123,
  // ])
  const clients = await self.clients.matchAll({
    includeUncontrolled: true,
  });

  // console.log(clients)
  clients.forEach(client => {
    // send_message_to_client(client, { a: 123 }).then((m) =>
    //   console.log(`SW Received Message: ${m}`),
    // )
    client.postMessage({
      firebaseMessaging: {
        type: 'backgroud-push-received',
        payload,
      },
    });
  });

  const notify = notificationConfig[notificationType];
  if (notify) {
    registration.showNotification(notify.title, notify.options);
  } else if (notification) {
    const parsed = JSON.parse(notification);
    registration.showNotification(parsed.title, parsed.options);
  }
};
self.addEventListener('push', function(event) {
  if (event.data) {
    console.log('This push event has data: ', event.data.text());
  } else {
    console.log('This push event has no data.');
  }
  // const title = 'Silent Notification';
  // const options = {
  //   silent: true
  // };
  // registration.showNotification(title, options);
});

self.addEventListener('message', event => {
  // console.log(event)
  const { data: eData } = event;
  const { type, data } = eData;
  console.log(type, data);
  switch (type) {
    case 'init':
      firebase.initializeApp(data);
      const messaging = firebase.messaging();
      messaging.onBackgroundMessage(messageHandler);

      break;
    case 'update_fcm_config':
      config = {
        ...config,
        ...data,
      };

      break;
    case 'update_notification_config':
      notificationConfig = {
        ...notificationConfig,
        ...data,
      };
      break;
    default:
      break;
  }
});
// self.addEventListener('push', (event) => {
//   console.log(event)
// })
// function send_message_to_all_clients (msg) {
//   clients.matchAll().then((clients) => {
//     clients.forEach((client) => {
//       send_message_to_client(client, msg).then((m) =>
//         console.log(`SW Received Message: ${m}`),
//       )
//     })
//   })
// }
// function send_message_to_client (client, msg) {
//   return new Promise((resolve, reject) => {
//     let msg_chan = new MessageChannel()
//     console.log(msg)
//     msg_chan.port1.onmessage = function (event) {
//       if (event.data.error) {
//         reject(event.data.error)
//       } else {
//         resolve(event.data)
//       }
//     }

//     client.postMessage(`SW Says: '${msg}'`, [
//       msg_chan.port2,
//     ])
//   })
// }
