import styles from './Menu.module.pcss';
import MenuButton from './components/MenuButton/MenuButton.tsx';
import { MenuProps } from './Menu.props.ts';
import MenuItem from '../../components/MenuItem/MenuItem.tsx';
import UserBlock from '../../components/UserBlock/UserBlock.tsx';

export default function Menu({ ...props }: MenuProps) {
  return (
    <div className={styles.menu}>
      <div className={styles.button}>
        <MenuButton toggleDrawer={props.toggleDrawer} />
      </div>
      <div className={styles.title}>{props.routeName}</div>

      <div className={styles.routes}>
        {props.routes.map((route) => (
          <MenuItem
            key={route.path}
            name={route.name}
            path={route.path}
            icon={route.icon}
          />
        ))}
      </div>

      <div className={styles.user}>
        <UserBlock
          username={props.user.username!}
          email={props.user.email!}
          logout={props.logout}
        />
      </div>
    </div>
  );
}
