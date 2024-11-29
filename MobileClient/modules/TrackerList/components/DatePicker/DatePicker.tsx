import { StyleSheet, Text, View } from 'react-native';
import Button from '../../../../UI/Button/Button';
import { Colors, Fonts, FontSize, Gaps, Radius } from '../../../../UI/styles';

export default function DatePicker() {
  return (
    <View style={style.card}>
      <View style={style.dateBlock}>
        <Text style={style.date}>01-01-2024</Text>
      </View>
      <View style={style.buttonBlock}>
        <Button name="Change" size="small" />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  card: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    padding: 15,
    borderRadius: Radius.radius20,
    backgroundColor: Colors.violetDark,
    gap: Gaps.gap40,
  },

  dateBlock: {
    marginLeft: 30,
  },

  buttonBlock: {
    flex: 1,
  },

  date: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSize.size16,
    color: Colors.white,
  },
});
