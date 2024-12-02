import { StyleSheet, Text, View } from 'react-native';
import { WarningIcon } from '../../assets/icons/WarningIcon';
import Button from '../../UI/Button/Button';
import { router } from 'expo-router';
import { Colors, Fonts, FontSize, Gaps } from '../../UI/styles';

export default function SuccessCard() {
  const handleLogin = () => {
    router.push('/auth/login');
  };
  return (
    <View>
      <WarningIcon />

      <View style={styles.container}>
        <Text style={styles.title}>You have been successfully registered!</Text>
        <Button name="Login" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Gaps.gap16,
  },

  title: {
    textAlign: 'center',
    fontFamily: Fonts.semiBold,
    fontSize: FontSize.size16,
    color: Colors.white,
  },
});
