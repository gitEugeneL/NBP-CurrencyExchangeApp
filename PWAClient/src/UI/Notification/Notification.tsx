import { NotificationProps } from './notification.pros.ts';
import { useEffect, useState } from 'react';
import styles from './Notification.module.pcss';

export default function Notification({ notificationError }: NotificationProps) {
  const [isShown, setIsShown] = useState<boolean>(false);

  useEffect(() => {
    if (!notificationError) {
      return;
    }
    setIsShown(true);
    const timerId = setTimeout(() => {
      setTimeout(() => setIsShown(false), 300);
    }, 3000);
    return () => {
      clearTimeout(timerId);
    };
  }, [notificationError]);

  if (!isShown) return null;

  return <div className={styles.error}>{notificationError}</div>;
}
