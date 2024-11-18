import { StyleSheet, View } from 'react-native';
import Title from '../../UI/Title/Title';
import { Logo } from '../../assets/elements/Logo';
import { Gaps } from '../../UI/styles';
import React from 'react';
import LoginForm from '../../modules/LoginForm/LoginForm';
import Button from '../../UI/Button/Button';

export default function LoginPage() {
  return (
    <View style={styles.container}>
      <View style={styles.titleBlock}>
        <Logo />
        <Title title="Log in" />
      </View>
      <LoginForm />
      <Button name="Create account" appearance="secondary" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    gap: Gaps.gap20,
  },

  titleBlock: {
    alignItems: 'center',
    gap: Gaps.gap40,
  },
});
