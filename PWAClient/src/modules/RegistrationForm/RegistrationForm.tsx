import { useNavigate } from 'react-router';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  registrationAtom,
  registrationState
} from '../../store/registration/registration.state.ts';
import {
  RegistrationFormSchema,
  RegistrationFormValidationSchema
} from './RegistrationForm.schemes.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { RegistrationRequest } from '../../store/registration/registration.models.ts';
import { useEffect } from 'react';
import styles from './Registration.module.pcss';
import CustomInput from '../../UI/CustomInput/CustomInput.tsx';
import PasswordInput from '../../components/PasswordInput/PasswordInput.tsx';
import Button from '../../UI/Button/Button.tsx';
import Notification from '../../UI/Notification/Notification.tsx';

export default function RegistrationForm() {
  const { isLoading, error, userId } = useAtomValue(registrationState);
  const registration = useSetAtom(registrationAtom);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegistrationFormSchema>({
    resolver: yupResolver(RegistrationFormValidationSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const formSubmit = (data: RegistrationFormSchema) => {
    const request: RegistrationRequest = {
      email: data.email,
      password: data.password,
      username: data.username
    };
    registration(request);
  };

  useEffect(() => {
    if (!isLoading && !error && userId) {
      navigate('/auth/success');
    }
  }, [isLoading, error, userId]);

  return (
    <>
      <Notification notificationError={error} />

      <form className={styles.form} onSubmit={handleSubmit(formSubmit)}>
        <div className={styles.wrapper}>
          <div>
            <CustomInput
              label='Username'
              name='username'
              placeholder='Enter your name'
              control={control}
              errors={errors}
            />
            <CustomInput
              label='Email'
              name='email'
              placeholder='Enter your email'
              control={control}
              errors={errors}
            />
          </div>

          <div>
            <PasswordInput
              label='Password'
              name='password'
              placeholder='Your strong password'
              control={control}
              errors={errors}
            />

            <PasswordInput
              label='Confirm password'
              name='confirmPassword'
              placeholder='Confirm your password'
              control={control}
              errors={errors}
            />
          </div>
        </div>

        <div className={styles.buttonBlock}>
          <Button name='Registration' />
        </div>
      </form>
    </>
  );
}
