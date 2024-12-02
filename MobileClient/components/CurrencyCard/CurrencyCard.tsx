import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, FontSize, Gaps, Radius } from '../../UI/styles';
import React from 'react';
import MoneyLogo from '../../UI/MoneyLogo/MoneyLogo';
import { CurrencyCardProps } from './CurrencyCard.props';
import { isToday } from '../../helpers/dateHelpers';

export default function CurrencyCard({
  date,
  name,
  shortName,
  buyRate,
  sellRate,
  nbpRate,
  walletId,
  appearance = 'default',
}: CurrencyCardProps) {
  const handleClick = () => {
    console.log(walletId);
  };

  return (
    <Pressable style={styles.card} onPressOut={handleClick}>
      <View style={styles.textWrapper}>
        <View style={styles.firstBlock}>
          <Text style={[styles.value, appearance === 'buy' ? styles.disabled : null]}>
            sel: {!isToday(date) ? '(old) ' : null}
            <Text style={styles.price}>{buyRate}</Text>
          </Text>
          <View style={styles.namesBlock}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.shortName}>{shortName}</Text>
          </View>
        </View>

        <View style={styles.secondBlock}>
          <Text style={[styles.value, appearance === 'sell' ? styles.disabled : null]}>
            buy: {!isToday(date) ? '(old) ' : null}
            <Text style={styles.price}>{sellRate}</Text>
          </Text>
          <Text style={[styles.value, appearance !== 'default' ? styles.disabled : null]}>
            NBP: {!isToday(date) ? ' (old) ' : null}
            <Text style={styles.price}>{nbpRate}</Text>
          </Text>
        </View>
      </View>
      <View>
        <MoneyLogo shortName={shortName} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 25,
    flexDirection: 'row',
    marginVertical: 15,
    padding: 15,
    borderRadius: Radius.radius20,
    backgroundColor: Colors.violetDark,
    gap: Gaps.gap16,
  },

  value: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: FontSize.size14,
  },

  disabled: {
    color: Colors.blackGray,
  },

  price: {
    fontFamily: Fonts.semiBold,
  },

  textWrapper: {
    flex: 1,
    justifyContent: 'center',
  },

  namesBlock: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Gaps.gap10,
  },

  name: {
    fontFamily: Fonts.regular,
    color: Colors.white,
    fontSize: FontSize.size12,
  },

  shortName: {
    fontFamily: Fonts.semiBold,
    color: Colors.white,
    fontSize: FontSize.size18,
  },

  firstBlock: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  secondBlock: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
