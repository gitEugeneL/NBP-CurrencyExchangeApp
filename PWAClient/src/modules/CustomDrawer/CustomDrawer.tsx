import 'react-modern-drawer/dist/index.css';
import styles from './CustomDrawer.module.pcss';
import { CustomDrawerProps } from './CustomDrawer.props.ts';
import Drawer from 'react-modern-drawer';
import { CloseIcon } from './icons/CloseIcon.tsx';
import UserBlock from '../../components/UserBlock/UserBlock.tsx';
import MenuItem from '../../components/MenuItem/MenuItem.tsx';
import Button from '../../UI/Button/Button.tsx';

export default function CustomDrawer({ ...props }: CustomDrawerProps) {
  return (
    <>
      <Drawer
        open={props.isDrawerOpened}
        onClose={props.toggleDrawer}
        direction='left'
        size='70%'
        style={{ backgroundColor: '#18181E' }}
        overlayColor={'rgba(43, 42, 58, 0.9)'}
        overlayOpacity={0.9}
        className={styles.drawer}
      >
        <div className={styles.closeButton} onClick={props.toggleDrawer}>
          <CloseIcon />
        </div>
        <UserBlock username={props.user.username!} email={props.user.email!} />

        {props.routes.map((route) => (
          <MenuItem
            key={route.path}
            name={route.name}
            path={route.path}
            icon={route.icon}
            toggleDrawer={props.toggleDrawer}
          />
        ))}

        <div className={styles.logout}>
          <div className={styles.btn}>
            <Button
              name='Logout'
              appearance='secondary'
              size={'small'}
              onClick={props.logout}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
}
