import { StyleSheet, View } from 'react-native';
import Button from '../../UI/Button/Button';
import CustomInput from '../../UI/CustomInput/CustomInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { LoginFormSchema, LoginFormValidationSchema } from './LoginForm.schemes';
import { useAtom } from 'jotai';
import { LoginRequest } from '../../store/auth/auth.models';
import Notification from '../../UI/Notification/Notification';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { loginAtom } from '../../store/auth/auth.state';

export default function LoginForm() {
  const [state, login] = useAtom(loginAtom);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: yupResolver(LoginFormValidationSchema),
  });

  const formSubmit = async (data: LoginFormSchema) => {
    const loginRequest: LoginRequest = {
      email: data.email,
      password: data.password,
    };
    login(loginRequest);
  };

  useEffect(() => {
    if (state.accessToken && state.expiresDate) {
      router.replace('/(app)');
    }
  }, [state.accessToken]);

  return (
    <>
      <Notification notificationError={state.error} />

      <View>
        <CustomInput
          label="Login"
          name="email"
          placeholder="Enter your email"
          errors={errors}
          control={control}
        />

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter your password"
          errors={errors}
          control={control}
        />

        <Button
          style={styles.button}
          name="Login"
          onPress={handleSubmit(formSubmit)}
          isLoading={state.isLoading}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
});
