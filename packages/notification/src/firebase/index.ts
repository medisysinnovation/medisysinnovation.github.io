import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { FirebaseOptions, FirebaseApp } from '@firebase/app-types';

export const initFirebaseConfig = (
  option: FirebaseOptions,
): Omit<FirebaseApp, 'delete'> => {
  console.log('init firebase start');
  const firebaseApp = initializeApp(option);
  return firebaseApp;
};

export const getFirebaseMessaging = (app: FirebaseApp) => {
  return getMessaging(app);
};

export { onMessage as onFirebaseMessage, getToken as getMessagingToken };
