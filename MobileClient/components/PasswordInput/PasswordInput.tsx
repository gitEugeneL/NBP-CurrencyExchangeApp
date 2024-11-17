import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { PasswordInputProps } from './PasswordInput.props';
import { OpenIcon } from './icons/OpenIcon';
import { CloseIcon } from './icons/CloseIcon';
import Input from '../../UI/Input/Input';

export default function PasswordInput({ ...props }: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handlePressIcon = () => {
    setIsPasswordVisible((state) => !state);
  };

  return (
    <View>
      <Input {...props} secureTextEntry={!isPasswordVisible} />

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
    top: 18,
  },
});
