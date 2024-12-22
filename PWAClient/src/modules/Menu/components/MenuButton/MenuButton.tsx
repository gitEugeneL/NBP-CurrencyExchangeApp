import { MenuButtonProps } from './MenuButton.props.ts';
import { MenuButtonIcon } from './icons/MenuButtonIcon.tsx';
import styles from './MenuButton.module.pcss';

export default function MenuButton({ toggleDrawer }: MenuButtonProps) {
  return (
    <div className={styles.button} onClick={toggleDrawer}>
      <MenuButtonIcon />
    </div>
  );
}
