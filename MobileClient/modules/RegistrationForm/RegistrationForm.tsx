import CustomInput from '../../UI/CustomInput/CustomInput';
import { useForm } from 'react-hook-form';
import {
  RegistrationFormSchema,
  RegistrationFormValidationSchema,
} from './RegistrationForm.schemes';
import { yupResolver } from '@hookform/resolvers/yup';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import Button from '../../UI/Button/Button';
import { StyleSheet, View } from 'react-native';
import { RegistrationRequest } from '../../store/models/registration.models';
import { useAtom } from 'jotai';
import Notification from '../../UI/Notification/Notification';
import { registrationAtom } from '../../store/registration.state';
import { useEffect } from 'react';
import { router } from 'expo-router';

export default function RegistrationForm() {
  const [state, registration] = useAtom(registrationAtom);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormSchema>({
    resolver: yupResolver(RegistrationFormValidationSchema),
  });

  const formSubmit = (data: RegistrationFormSchema) => {
    const request: RegistrationRequest = {
      email: data.email,
      password: data.password,
      username: data.username,
    };
    registration(request);
  };

  useEffect(() => {
    if (!state.isLoading && !state.error && state.userId) {
      router.push('/auth/success');
    }
  }, [state.isLoading, state.error, state.userId]);

  return (
    <>
      <Notification notificationError={state.error} />

      <View>
        <CustomInput
          label="Username"
          name="username"
          placeholder="Enter your name"
          control={control}
          errors={errors}
        />

        <CustomInput
          label="Email"
          name="email"
          placeholder="Enter your email"
          control={control}
          errors={errors}
        />

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Your strong password"
          control={control}
          errors={errors}
        />

        <PasswordInput
          label="Confirm password"
          name="confirmPassword"
          placeholder="Confirm your password"
          control={control}
          errors={errors}
        />

        <Button style={styles.button} name="Registration" onPress={handleSubmit(formSubmit)} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
});
