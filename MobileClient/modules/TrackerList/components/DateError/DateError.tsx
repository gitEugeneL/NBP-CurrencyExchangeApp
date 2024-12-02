import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, FontSize, Gaps, Radius } from '../../../../UI/styles';
import React from 'react';
import Button from '../../../../UI/Button/Button';
import { DateErrorProps } from './DateError.props';
import { WarningIcon } from '../../../../assets/icons/WarningIcon';

export default function DateError({ loadData }: DateErrorProps): JSX.Element {
  const handleReset = () => {
    loadData();
  };

  return (
    <View style={styles.container}>
      <WarningIcon />
      <Text style={styles.error}>
        There is no data available on this day. It's probably a weekend or a holiday!
      </Text>

      <View style={styles.button}>
        <Button name="Check the current rate" onPressOut={handleReset} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
    marginVertical: 15,
    padding: 25,
    borderRadius: Radius.radius20,
    backgroundColor: Colors.violetDark,
    gap: Gaps.gap20,
  },

  error: {
    textAlign: 'center',
    fontSize: FontSize.size14,
    color: Colors.white,
    fontFamily: Fonts.regular,
  },

  button: {
    width: '100%',
  },
});
