import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, FontSize, Gaps, Radius } from '../../UI/styles';
import { WarningCardProps } from './WarningCard.props';
import { SpeedIcon } from '../../assets/icons/SpeedIcon';
import { MoneyIcon } from '../../assets/icons/MoneyIcon';
import Button from '../../UI/Button/Button';
import { router } from 'expo-router';
import React from 'react';

export default function WarningCard({ ...props }: WarningCardProps) {
  const handlePressButton = () => {
    if (props.redirectRoute) {
      router.push(props.redirectRoute);
    } else if (props.action) {
      props.action();
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.icon}>
        {props.appearance === 'speed' && <SpeedIcon />}
        {props.appearance === 'money' && <MoneyIcon />}
      </View>
      <Text style={styles.title}>{props.title}</Text>

      <View style={styles.button}>
        <Button name={props.buttonName} onPress={handlePressButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
    marginVertical: 15,
    padding: 25,
    borderRadius: Radius.radius20,
    backgroundColor: Colors.violetDark,
    gap: Gaps.gap20,
  },

  button: {
    width: '100%',
  },

  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    textAlign: 'center',
    fontFamily: Fonts.semiBold,
    fontSize: FontSize.size16,
    color: Colors.white,
  },
});
