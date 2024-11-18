import { StyleSheet, View } from 'react-native';
import RegistrationForm from '../../modules/RegistrationForm/RegistrationForm';
import Button from '../../UI/Button/Button';
import React from 'react';
import { router } from 'expo-router';
import Title from '../../UI/Title/Title';
import { Gaps } from '../../UI/styles';

export default function RegistrationPage() {
  const handleRedirect = () => {
    router.push('/auth/login');
  };

  return (
    <View style={styles.container}>
      <Title title="Registration" />
      <RegistrationForm />
      <Button name="Login" appearance="secondary" onPress={handleRedirect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: Gaps.gap20,
  },
});
