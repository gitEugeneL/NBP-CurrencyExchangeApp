import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { PasswordInputProps } from './PasswordInput.props';
import { OpenIcon } from './icons/OpenIcon';
import { CloseIcon } from './icons/CloseIcon';
import CustomInput from '../../UI/CustomInput/CustomInput';

export default function PasswordInput({
  label,
  name,
  control,
  errors,
  ...props
}: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handlePressIcon = () => {
    setIsPasswordVisible((state) => !state);
  };

  return (
    <View>
      <CustomInput
        label={label}
        name={name}
        control={control}
        errors={errors}
        {...props}
        secureTextEntry={!isPasswordVisible}
      />

      <Pressable style={styles.icon} onPress={handlePressIcon}>
        {isPasswordVisible ? <OpenIcon /> : <CloseIcon />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 15,
    top: 44,
  },
});
