import styles from './MenuItem.module.pcss';
import { NavLink } from 'react-router-dom';
import { MenuItemProps } from './MenuItem.props.ts';
import cn from 'classnames';

export default function MenuItem({ name, path, icon }: MenuItemProps) {
  return (
    <NavLink
      to={`/${path}`}
      className={({ isActive }) =>
        cn(styles.container, { [styles.active]: isActive })
      }
    >
      <div className={styles.icon}>{icon}</div>
      <div className={styles.text}>{name}</div>
    </NavLink>
  );
}
