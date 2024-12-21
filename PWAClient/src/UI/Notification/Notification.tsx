import { NotificationProps } from './notification.pros.ts';
import { useEffect, useState } from 'react';
import styles from './Notification.module.pcss';
import { useSetAtom } from 'jotai/index';
import { resetErrorAtom } from '../../store/auth/auth.state.ts';

export default function Notification({ notificationError }: NotificationProps) {
  const resetError = useSetAtom(resetErrorAtom);
  const [isShown, setIsShown] = useState<boolean>(false);

  useEffect(() => {
    if (!notificationError) {
      return;
    }
    setIsShown(true);
    const timerId = setTimeout(() => {
      setTimeout(() => {
        setIsShown(false);
        resetError();
      }, 300);
    }, 3000);
    return () => {
      clearTimeout(timerId);
    };
  }, [notificationError]);

  if (!isShown) return null;

  return <div className={styles.error}>{notificationError}</div>;
}
