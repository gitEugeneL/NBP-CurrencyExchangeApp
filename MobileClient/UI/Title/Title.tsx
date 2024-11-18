import { StyleSheet, Text, View } from 'react-native';
import { TitleProps } from './Title.props';
import { Colors, Fonts, FontSize } from '../styles';

export default function Title({ title, description = undefined }: TitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  title: {
    color: Colors.white,
    fontSize: FontSize.size32,
  },
  description: {
    color: Colors.gray,
    fontSize: FontSize.size16,
    fontFamily: Fonts.regular,
  },
});
