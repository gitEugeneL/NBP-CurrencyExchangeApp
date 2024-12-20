import { TitleProps } from './Title.props';
import styles from './Title.module.pcss';

export default function Title({ title, description = undefined }: TitleProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      {description && <span className={styles.description}>{description}</span>}
    </div>
  );
}
