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

export default function RegistrationForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormSchema>({
    resolver: yupResolver(RegistrationFormValidationSchema),
  });

  const formSubmit = (data: RegistrationFormSchema) => {
    console.log(data.email);
  };

  return (
    <View>
      <CustomInput
        label="Name"
        name="name"
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
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
});
