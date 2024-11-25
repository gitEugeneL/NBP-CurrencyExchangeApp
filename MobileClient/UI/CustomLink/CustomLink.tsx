import { CustomLinkProps } from './CustomLink.props';
import { Link } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { Colors, Fonts, FontSize } from '../styles';

export default function CustomLink({ name, ...props }: CustomLinkProps) {
  return (
    <Link {...props} style={styles.link}>
      <Text>{name}</Text>
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    textAlign: 'center',
    fontSize: FontSize.size20,
    fontFamily: Fonts.regular,
    color: Colors.link,
  },
});
