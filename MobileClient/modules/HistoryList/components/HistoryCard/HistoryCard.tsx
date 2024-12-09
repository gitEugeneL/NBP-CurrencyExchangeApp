import { StyleSheet, Text, View } from 'react-native';
import { ExchangeIcon } from './icons/ExchangeIcon';
import { Colors, Fonts, FontSize, Gaps, Radius } from '../../../../UI/styles';

export default function HistoryCard() {
  return (
    <View style={styles.card}>
      <ExchangeIcon />
      <View style={styles.container}>
        <View>
          <Text style={styles.name}>EUR to PLN</Text>
          <Text style={styles.date}>2024-12-01 13:45</Text>
        </View>

        <View style={styles.moneyWrapper}>
          <Text style={styles.money}>-250.00 EUR</Text>
          <Text style={styles.money}>+1000.00 PLN</Text>
        </View>
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
    backgroundColor: Colors.blackBlue,
    gap: Gaps.gap16,
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  moneyWrapper: {
    alignItems: 'flex-end',
  },

  name: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSize.size16,
    color: Colors.white,
  },

  date: {
    fontFamily: Fonts.regular,
    fontSize: FontSize.size12,
    color: Colors.blackGray,
  },

  money: {
    fontFamily: Fonts.regular,
    fontSize: FontSize.size12,
    color: Colors.white,
  },
});
