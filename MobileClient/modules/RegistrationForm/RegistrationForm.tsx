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
import { CreateUserAtom } from '../../store/user.state';
import { RegistrationRequest } from '../../store/models/register.models';
import { useAtom } from 'jotai';
import Notification from '../../UI/Notification/Notification';

export default function RegistrationForm() {
  const [state, createUser] = useAtom(CreateUserAtom);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormSchema>({
    resolver: yupResolver(RegistrationFormValidationSchema),
  });

  const formSubmit = (data: RegistrationFormSchema) => {
    const registrationRequest: RegistrationRequest = {
      email: data.email,
      password: data.password,
      username: data.username,
    };
    createUser(registrationRequest);
  };

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
