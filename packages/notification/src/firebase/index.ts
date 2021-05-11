import firebase from 'firebase';
import 'firebase/messaging';
import { FirebaseOptions } from '@firebase/app-types';

export const initFirebaseConfig = (option: FirebaseOptions) => {
  console.log('init firebase start');
  if (!firebase.apps.length) {
    firebase.initializeApp(option);
  }
};

export const getFirebaseMessaging = () => {
  return firebase.messaging();
};
