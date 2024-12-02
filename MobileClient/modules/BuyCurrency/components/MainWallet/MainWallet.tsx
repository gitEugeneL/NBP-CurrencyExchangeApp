import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, FontSize, Gaps, Radius } from '../../../../UI/styles';
import React from 'react';
import MoneyLogo from '../../../../UI/MoneyLogo/MoneyLogo';
import { MainWalletProps } from './MainWallet.props';

export default function MainWallet({ name, shortName, value }: MainWalletProps) {
  const formatValue = (number: number) =>
    number.toString().includes('.') ? number.toString() : `${number}.00`;

  return (
    <View style={styles.card}>
      <MoneyLogo shortName="PLN" width={38} height={38} />
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.shortName}>{shortName}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
        <Text style={styles.value}>zł {formatValue(value)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    padding: 15,
    borderRadius: Radius.radius20,
    backgroundColor: Colors.violetDark,
    gap: Gaps.gap10,
  },

  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  value: {
    color: Colors.white,
    fontFamily: Fonts.semiBold,
    fontSize: FontSize.size18,
  },

  shortName: {
    color: Colors.white,
    fontFamily: Fonts.regular,
  },

  name: {
    color: Colors.white,
    fontFamily: Fonts.regular,
  },
});
