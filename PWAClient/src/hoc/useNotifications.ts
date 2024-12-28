import { useEffect } from 'react';

export default function useNotifications() {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (body: string) => {
    if (Notification.permission === 'granted') {
      new Notification('NBP Currency Exchange push notification', {
        body: body,
        icon: 'icons/icon512_maskable.png'
      });
    } else {
      console.error('push permissions');
    }
  };
}

const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.error('Notifications are not supported by your browser');
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    console.log('Notification permission granted');
  } else {
    console.error('Notification permission not granted');
  }
};
