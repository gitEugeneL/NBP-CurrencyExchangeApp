import { StyleSheet, View } from 'react-native';
import Button from '../../UI/Button/Button';
import CustomInput from '../../UI/CustomInput/CustomInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { LoginFormSchema, LoginFormValidationSchema } from './LoginForm.schemes';
import { useAtom } from 'jotai';
import { LoginAtom } from './state/login.state';
import { LoginRequest } from './state/login.models';
import Notification from '../../UI/Notification/Notification';

export default function LoginForm() {
  const [state, login] = useAtom(LoginAtom);

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
