import React, { useEffect, useState } from 'react';
import request from 'umi-request';
import { Input, Select, ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { Form, Button, Modal } from '@medisys/component';
import {
  initFirebaseConfig,
  getFirebaseMessaging,
  onFirebaseMessage,
  getMessagingToken,
} from '@medisys/notification';

import { MIConfig } from '@medisys/utils';
import { useBoolean } from 'ahooks';
let testLoadingState = false;
// console.dir(ConfigProvider);
// console.dir(ConfigProvider.ConfigContext.Consumer);

const ModalDemo = () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean(false);
  const [
    state2,
    { toggle: toggle2, setTrue: setTrue2, setFalse: setFalse2 },
  ] = useBoolean(false);

  // useEffect(() => {
  //   setInterval(() => {
  //     toggle2();
  //   }, 3000);
  // }, []);
  // const codeset = {
  //   users: [
  //     { id: 1, name: 'ABC' },
  //     { id: 2, name: 'CDE' },
  //   ],
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      testLoadingState = !testLoadingState;
      MIConfig.updateState({
        loading: {
          models: {
            somename: testLoadingState,
          },
        },
        codeset: {
          users: [
            { id: 1, name: 'ABC' },
            { id: 2, name: 'CDE' },
          ],
        },
      });
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const { getPrefixCls, autoInsertSpaceInButton, direction } = React.useContext(
    ConfigProvider.ConfigContext,
  );
  // console.log(
  //   getPrefixCls(),
  //   getPrefixCls('affix', '123'),
  //   getPrefixCls,
  //   autoInsertSpaceInButton,
  //   direction,
  // );
  // Modal.warning
  console.log(MIConfig);
  return (
    <>
      <Button
        onClick={() => {
          // request
          //   .get(
          //     'https://developers.onemap.sg/commonapi/search?searchVal=s&returnGeom=Y&getAddrDetails=Y',
          //   )
          //   .then(function(response) {
          //     console.log(response);
          //   })
          //   .catch(function(error) {
          //     console.log(error);
          //   });

          const app = initFirebaseConfig({
            apiKey: 'AIzaSyCR6K6Irj6sWTyDsU6FW2d0alFnQLwrvgQ',
            authDomain: 'banchoon-wms-dev.firebaseapp.com',
            projectId: 'banchoon-wms-dev',
            storageBucket: 'banchoon-wms-dev.appspot.com',
            messagingSenderId: '426316456594',
            appId: '1:426316456594:web:aca25576b5cd056fd07c4b',
            measurementId: 'G-MNQQQ05BVD',
          });
          const messaging = getFirebaseMessaging(app);
          console.log(messaging);
          getMessagingToken(messaging, {
            vapidKey:
              'BLnUvd6tLdxlr101qE8cNuAVf3gTf49qUB2v5fgX6W-dWyN-Zd8CjtRYpduNxwInrThyrin9KvD6dUWbFna8fmc',
          })
            .then(currentToken => {
              if (currentToken) {
                // Send the token to your server and update the UI if necessary
                // ...
                localStorage.setItem('fbmsg_t', currentToken);
                onFirebaseMessage(messaging, payload => {
                  console.log('Message received. ', payload);
                  // ...
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

          return;
          const firebaseConfig = process.env.firebaseConfig || {};
          if (!firebase.messaging.isSupported()) {
            return;
          }

          if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            firebase
              .messaging()
              .usePublicVapidKey(`${process.env.firebaseVapidKey}`);
          }

          // Get Instance ID token. Initially this makes a network call, once retrieved
          // subsequent calls to getToken will return from cache.
          firebase
            .messaging()
            .getToken()
            .then((currentToken: string) => {
              if (currentToken) {
                sessionStorage.setItem(
                  sessionStorageKey.fcmToken,
                  currentToken,
                );
                onTokenReceived(currentToken);
              }
            })
            .catch(err => {
              console.log(err);
            });

          firebase
            .messaging()
            .onMessage(onMessageReceivedHandler(onMessageReceived));
          console.log(app);
        }}
      >
        Show Modal
      </Button>
      {/* <ConfigProvider.ConfigContext.Consumer>
        {context => {
          const { getPrefixCls } = context;
          console.log(context, getPrefixCls(), getPrefixCls('affix', '123'));
          return <div>tet</div>;
        }}
      </ConfigProvider.ConfigContext.Consumer> */}

      <Modal
        visible={state}
        model="somename"
        onCancel={() => {
          setFalse();
        }}
        onOk={() => {
          setFalse();
        }}
      >
        <div>I toggle loading every 5 seconds</div>
        <Button
          onClick={() => {
            setTrue2();
          }}
        >
          Show Another Modal
        </Button>
      </Modal>
      <Modal
        visible={state2}
        onCancel={() => {
          setFalse2();
        }}
        onOk={() => {
          setFalse2();
        }}
      >
        <div>I am not watching any model, so I dun have loading block</div>
      </Modal>
    </>
  );
};

export default ModalDemo;
