import LoginForm from '../../../../modules/LoginForm/LoginForm.tsx';
import { resetRegistrationAtom } from '../../../../store/registration/registration.state.ts';
import { useSetAtom } from 'jotai';
import styles from './LoginPage.module.pcss';
import Button from '../../../../UI/Button/Button.tsx';
import Title from '../../../../UI/Title/Title.tsx';
import { useNavigate } from 'react-router';
import Logo from '../../../../assets/elements/Logo.tsx';

export default function LoginPage() {
  const resetRegistrationProcess = useSetAtom(resetRegistrationAtom);
  const navigate = useNavigate();

  const handleRedirect = () => {
    resetRegistrationProcess();
    navigate('/auth/registration');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleBlock}>
        <Logo />
        <Title title='Log in' />
      </div>
      <LoginForm />
      <div className={styles.buttonBlock}>
        <Button
          name='Create account'
          appearance='secondary'
          onClick={handleRedirect}
        />
      </div>
    </div>
  );
}
