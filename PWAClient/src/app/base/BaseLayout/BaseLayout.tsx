import styles from './BaseLayout.module.pcss';
import { Outlet, useLocation } from 'react-router';
import { TrackerIcon } from '../../../assets/icons/TrackerIcon.tsx';
import { WalletIcon } from '../../../assets/icons/WalletIcon.tsx';
import { ArrowIcon } from '../../../assets/icons/ArrowIcon.tsx';
import { HistoryIcon } from '../../../assets/icons/HistoryIcon.tsx';
import CustomDrawer from '../../../modules/CustomDrawer/CustomDrawer.tsx';
import Menu from '../../../modules/Menu/Menu.tsx';
import { useEffect, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai/index';
import { getUserInfoAtom, userState } from '../../../store/user/user.state.ts';
import { logoutAtom } from '../../../store/auth/auth.state.ts';
import useNetworkStatus from '../../../helpers/useNetworkSatus.ts';
import OfflineNotification from '../../../UI/OfflineNotification/OfflineNotification.tsx';

export default function BaseLayout() {
  const routes = [
    { name: 'My Wallets', path: 'wallets', icon: <WalletIcon /> },
    { name: 'Tracker', path: 'tracker', icon: <TrackerIcon /> },
    { name: 'Buy currency', path: 'buy', icon: <ArrowIcon /> },
    { name: 'Sell currency', path: 'sell', icon: <ArrowIcon /> },
    {
      name: 'Transactions',
      path: 'transactions',
      icon: <HistoryIcon />
    }
  ];

  const isOnline = useNetworkStatus();
  const onlineRoutes = isOnline
    ? routes
    : routes.filter(
        (route) => !['tracker', 'buy', 'sell'].includes(route.path)
      );

  const user = useAtomValue(userState);
  const userInfo = useSetAtom(getUserInfoAtom);
  const logout = useSetAtom(logoutAtom);

  const location = useLocation();
  const currentRouteName =
    location.pathname.slice(1).charAt(0).toUpperCase() +
    location.pathname.slice(2);

  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);
  const toggleDrawer = () => setIsDrawerOpened(!isDrawerOpened);

  useEffect(() => {
    if (!user.userId) {
      userInfo();
    }
  }, []);

  return (
    <div>
      {!isOnline && <OfflineNotification />}

      <Menu
        toggleDrawer={toggleDrawer}
        routeName={currentRouteName}
        logout={logout}
        user={user}
        routes={onlineRoutes}
      />
      <div className={styles.drawer}>
        <CustomDrawer
          logout={logout}
          user={user}
          routes={onlineRoutes}
          isDrawerOpened={isDrawerOpened}
          toggleDrawer={toggleDrawer}
        />
      </div>

      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
}
