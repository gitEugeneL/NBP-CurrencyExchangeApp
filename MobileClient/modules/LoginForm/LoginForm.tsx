import { StyleSheet, View } from 'react-native';
import Input from '../../UI/Input/Input';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { Gaps } from '../../UI/styles';
import Button from '../../UI/Button/Button';

export default function LoginForm() {
  return (
    <View style={styles.container}>
      <Input placeholder="Enter your email" />
      <PasswordInput placeholder="Enter your password" />
      <Button name="Login" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Gaps.gap40,
  },
});
