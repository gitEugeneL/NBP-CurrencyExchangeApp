import { ButtonProps } from './Button.props';
import styles from './Button.module.pcss';
import cn from 'classnames';
import LoaderIndicator from '../../assets/elements/LoaderIndicator.tsx';

export default function Button({
  name,
  isLoading = false,
  appearance = 'primary',
  size = 'normal',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(styles.button, {
        [styles.small]: size === 'small',
        [styles.primary]: appearance === 'primary',
        [styles.secondary]: appearance === 'secondary'
      })}
      {...props}
    >
      {isLoading && <LoaderIndicator width={75} height={75} />}
      {!isLoading && name}
    </button>
  );
}
