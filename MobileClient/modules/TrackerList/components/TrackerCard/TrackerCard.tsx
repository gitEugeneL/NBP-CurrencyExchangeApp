import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, FontSize, Gaps, Radius } from '../../../../UI/styles';
import React from 'react';
import MoneyLogo from '../../../../UI/MoneyLogo/MoneyLogo';

export default function TrackerCard() {
  return (
    <View style={styles.card}>
      <View style={styles.textWrapper}>
        <View style={styles.firstBlock}>
          <Text style={styles.priceName}>
            buy: <Text style={styles.price}>4.6500</Text>
          </Text>
          <View style={styles.namesBlock}>
            <Text style={styles.name}>Polish Zloty</Text>
            <Text style={styles.shortName}>PLN</Text>
          </View>
        </View>

        <View style={styles.secondBlock}>
          <Text style={styles.priceName}>
            sell: <Text style={styles.price}>4.6500</Text>
          </Text>
          <Text style={styles.priceName}>
            NBP: <Text style={styles.price}>4.6500</Text>
          </Text>
        </View>
      </View>
      <View>
        <MoneyLogo shortName={'EUR'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 25,
    flexDirection: 'row',
    marginVertical: 10,
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
    alignItems: 'center',
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
