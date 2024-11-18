import { StyleSheet, View } from 'react-native';
import Button from '../../UI/Button/Button';
import CustomInput from '../../UI/CustomInput/CustomInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { LoginFormSchema, LoginFormValidationSchema } from './LoginForm.schemes';

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: yupResolver(LoginFormValidationSchema),
  });

  const formSubmit = (data: LoginFormSchema) => {
    console.log(data);
  };

  return (
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

      <Button style={styles.button} name="Login" onPress={handleSubmit(formSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
});
