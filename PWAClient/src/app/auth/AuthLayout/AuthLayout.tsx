import { Outlet } from 'react-router';
import styles from './AuthLayout.module.pcss';

export default function AuthLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Outlet />
      </div>
    </div>
  );
}
