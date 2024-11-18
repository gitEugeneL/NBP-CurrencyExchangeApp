import { StyleSheet, Text, TextInput, View } from 'react-native';
import { CustomInputProps } from './CustomInput.props';
import { Colors, Fonts, FontSize, Radius } from '../styles';
import { Controller } from 'react-hook-form';

export default function CustomInput({ label, name, control, errors, ...props }: CustomInputProps) {
  return (
    <View>
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors[name]?.message ? styles.inputError : null]}
            placeholderTextColor={Colors.gray}
            {...props}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <View style={styles.errorBlock}>
        {errors[name]?.message && (
          <Text style={styles.errorText}>{(errors[name] as { message?: string }).message}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: FontSize.size14,
    color: Colors.gray,
    marginBottom: 5,
    marginLeft: 10,
  },

  input: {
    backgroundColor: Colors.violetDark,
    color: Colors.white,
    height: 60,
    paddingHorizontal: 25,
    fontSize: FontSize.size16,
    borderRadius: Radius.radius10,
    fontFamily: Fonts.regular,
  },

  inputError: {
    borderWidth: 2,
    borderColor: Colors.red,
    paddingHorizontal: 23,
  },

  errorBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },

  errorText: {
    fontSize: FontSize.size12,
    fontFamily: Fonts.semiBold,
    color: Colors.red,
  },
});
