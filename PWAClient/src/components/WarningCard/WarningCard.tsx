import { WarningCardProps } from './WarningCard.props.ts';
import { useNavigate } from 'react-router';
import Button from '../../UI/Button/Button.tsx';
import { MoneyIcon } from '../../assets/icons/MoneyIcon.tsx';
import { SpeedIcon } from '../../assets/icons/SpeedIcon.tsx';
import styles from './WarningCard.module.pcss';

export default function WarningCard({ ...props }: WarningCardProps) {
  const navigate = useNavigate();

  const handlePressButton = () => {
    if (props.redirectRoute) {
      navigate(props.redirectRoute);
    } else if (props.action) {
      props.action();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        {props.appearance === 'speed' && <SpeedIcon />}
        {props.appearance === 'money' && <MoneyIcon />}
      </div>
      <h3 className={styles.title}>{props.title}</h3>

      <div>
        <Button name={props.buttonName} onClick={handlePressButton} />
      </div>
    </div>
  );
}
