import { StyleSheet, TextInput, View } from 'react-native';
import { InputProps } from './Input.props';
import { Colors, FontSize, Radius } from '../styles';

export default function Input({ ...props }: InputProps) {
  return (
    <View>
      <TextInput style={styles.input} placeholderTextColor={Colors.gray} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.violetDark,
    color: Colors.white,
    height: 60,
    paddingHorizontal: 25,
    fontSize: FontSize.size16,
    borderRadius: Radius.radius10,
  },
});
