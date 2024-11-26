import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, FontSize, Gaps, Radius } from '../../UI/styles';
import { EU } from './icons/EU';
import Button from '../../UI/Button/Button';

export default function WalletCard() {
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <EU />
        <View style={styles.wrapper}>
          <View style={styles.fistBlock}>
            <Text style={styles.shortName}>EUR</Text>
            <Text style={styles.country}>Europium Union</Text>
          </View>
          <View style={styles.secondBlock}>
            <Text style={styles.name}>Euro</Text>
            <Text style={styles.price}>€&nbsp;1200.00</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonBlock}>
        <Button style={styles.btn} name="Buy" appearance="secondary" size="small" />
        <Button style={styles.btn} name="Sell" appearance="secondary" size="small" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 25,
    marginVertical: 15,
    padding: 15,
    borderRadius: Radius.radius20,
    backgroundColor: Colors.violetDark,
    gap: Gaps.gap16,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  buttonBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Gaps.gap16,
  },

  btn: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },

  fistBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
  },

  secondBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
  },

  shortName: {
    fontFamily: Fonts.regular,
    color: Colors.white,
    fontSize: FontSize.size18,
  },

  country: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: FontSize.size14,
  },

  name: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: FontSize.size14,
  },

  price: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: FontSize.size18,
  },
});
