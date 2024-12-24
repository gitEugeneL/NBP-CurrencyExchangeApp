import styles from './MenuItem.module.pcss';
import { NavLink } from 'react-router-dom';
import { MenuItemProps } from './MenuItem.props.ts';
import cn from 'classnames';

export default function MenuItem({ ...props }: MenuItemProps) {
  return (
    <NavLink
      to={`/${props.path}`}
      onClick={props.toggleDrawer}
      className={({ isActive }) =>
        cn(styles.container, { [styles.active]: isActive })
      }
    >
      <div className={styles.icon}>{props.icon}</div>
      <div className={styles.text}>{props.name}</div>
    </NavLink>
  );
}
