import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, FontSize, Gaps, Radius } from '../../../../UI/styles';
import React from 'react';
import MoneyLogo from '../../../../UI/MoneyLogo/MoneyLogo';
import { TrackerCardProps } from './TrackerCard.props';
import { isToday } from '../../../../helpers/dateHelpers';

export default function TrackerCard({
  date,
  name,
  shortName,
  buyRate,
  sellRate,
  nbpRate,
}: TrackerCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.textWrapper}>
        <View style={styles.firstBlock}>
          <Text style={styles.priceName}>
            buy: {!isToday(date) ? '(old) ' : null}
            <Text style={styles.price}>{buyRate}</Text>
          </Text>
          <View style={styles.namesBlock}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.shortName}>{shortName}</Text>
          </View>
        </View>

        <View style={styles.secondBlock}>
          <Text style={styles.priceName}>
            sell: {!isToday(date) ? '(old) ' : null}
            <Text style={styles.price}>{sellRate}</Text>
          </Text>
          <Text style={styles.priceName}>
            NBP: {!isToday(date) ? ' (old) ' : null}
            <Text style={styles.price}>{nbpRate}</Text>
          </Text>
        </View>
      </View>
      <View>
        <MoneyLogo shortName={shortName} />
      </View>
    </View>
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

  textWrapper: {
    flex: 1,
    justifyContent: 'center',
  },

  namesBlock: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Gaps.gap10,
  },

  priceName: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: FontSize.size14,
  },

  price: {
    fontFamily: Fonts.semiBold,
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
