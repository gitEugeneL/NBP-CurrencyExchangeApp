import { StyleSheet, Text, View } from 'react-native';
import CustomInput from '../../UI/CustomInput/CustomInput';
import { MoneyInputProps } from './MoneyInput.props';
import MoneyLogo from '../../UI/MoneyLogo/MoneyLogo';
import { Colors, Fonts, FontSize } from '../../UI/styles';

export default function MoneyInput({
  label,
  name,
  shortName,
  control,
  errors,
  ...props
}: MoneyInputProps) {
  return (
    <View style={styles.input}>
      <CustomInput label={label} name={name} control={control} errors={errors} {...props} />
      <View style={styles.logo}>
        <MoneyLogo shortName={shortName} width={30} height={30} />
      </View>
      <Text style={styles.shortName}>{shortName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
  },

  logo: {
    position: 'absolute',
    top: 40,
    right: 55,
  },

  shortName: {
    position: 'absolute',
    top: 43,
    right: 15,
    fontSize: FontSize.size16,
    fontFamily: Fonts.semiBold,
    color: Colors.white,
  },
});
