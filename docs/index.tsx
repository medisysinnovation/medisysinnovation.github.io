import { useEffect } from 'react';
export default () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/firebase-messaging-sw.js';
    // script.async = true;
    script.onload = () => {
      console.log('firebase-messaging-sw loaded');
    };
    document.body.appendChild(script);
  }, []);
  return <div>test</div>;
};
