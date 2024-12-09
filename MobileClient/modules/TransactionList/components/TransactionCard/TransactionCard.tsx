import { StyleSheet, Text, View } from 'react-native';
import { ExchangeIcon } from './icons/ExchangeIcon';
import { Colors, Fonts, FontSize, Gaps, Radius } from '../../../../UI/styles';
import { TransactionCardProps } from './TransactionCard.props';
import { roundMoney } from '../../../../helpers/moneyHelpers';
import { dateToString } from '../../../../helpers/dateHelpers';

export default function TransactionCard({ ...props }: TransactionCardProps) {
  const date = dateToString(new Date(props.transactionDate));
  const inputMoney = `-${roundMoney(props.inputAmount)} ${props.inputCurrencySymbol}`;
  const outputMoney = `+${roundMoney(props.outputAmount)} ${props.outputCurrencySymbol}`;

  return (
    <View style={styles.card}>
      <ExchangeIcon />
      <View style={styles.container}>
        <View>
          <Text style={styles.name}>
            {props.inputCurrencyShortName} to {props.outputCurrencyShortName}
          </Text>
          <Text style={styles.date}>{date}</Text>
        </View>

        <View style={styles.moneyWrapper}>
          <Text style={styles.money}>{inputMoney}</Text>
          <Text style={styles.money}>{outputMoney}</Text>
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
    fontSize: FontSize.size14,
    color: Colors.white,
  },
});
