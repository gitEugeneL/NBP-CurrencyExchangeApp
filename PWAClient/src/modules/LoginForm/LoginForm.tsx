import {
  LoginFormSchema,
  LoginFormValidationSchema
} from './LoginForm.schemes.ts';
import { LoginRequest } from '../../store/auth/auth.models.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Button from '../../UI/Button/Button.tsx';
import CustomInput from '../../UI/CustomInput/CustomInput.tsx';
import { authState, loginAtom } from '../../store/auth/auth.state.ts';
import { useAtomValue, useSetAtom } from 'jotai';
import { useNavigate } from 'react-router';
import PasswordInput from '../../components/PasswordInput/PasswordInput.tsx';
import Notification from '../../UI/Notification/Notification.tsx';
import styles from './LoginForm.module.pcss';

export default function LoginForm() {
  const state = useAtomValue(authState);
  const login = useSetAtom(loginAtom);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormSchema>({
    resolver: yupResolver(LoginFormValidationSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const formSubmit = async (data: LoginFormSchema) => {
    const loginRequest: LoginRequest = {
      email: data.email,
      password: data.password
    };
    login(loginRequest);
  };

  useEffect(() => {
    if (state.accessToken && state.expiresDate) {
      navigate('/');
    }
  }, [state.accessToken]);

  return (
    <>
      <Notification notificationError={state.error} />

      <form className={styles.form} onSubmit={handleSubmit(formSubmit)}>
        <CustomInput
          label='Login'
          name='email'
          placeholder='Enter your email'
          errors={errors}
          control={control}
        />

        <PasswordInput
          label='Password'
          name='password'
          placeholder='Enter your password'
          errors={errors}
          control={control}
        />

        <div className={styles.buttonBlock}>
          <Button name='Login' isLoading={state.isLoading} />
        </div>
      </form>
    </>
  );
}
