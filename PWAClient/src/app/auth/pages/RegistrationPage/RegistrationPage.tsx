import { useNavigate } from 'react-router';
import styles from './RegistrationPage.module.pcss';
import Logo from '../../../../assets/elements/Logo.tsx';
import Title from '../../../../UI/Title/Title.tsx';
import Button from '../../../../UI/Button/Button.tsx';
import RegistrationForm from '../../../../modules/RegistrationForm/RegistrationForm.tsx';

export default function RegistrationPage() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/auth/login');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleBlock}>
        <div className={styles.logoBlock}>
          <Logo />
        </div>
        <Title title='Registration' />
      </div>
      <RegistrationForm />
      <Button name='Login' appearance='secondary' onClick={handleRedirect} />
    </div>
  );
}
