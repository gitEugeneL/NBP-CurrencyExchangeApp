import { UserBlockProps } from './UserBlock.props';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, FontSize, Gaps } from '../../../../UI/styles';

export default function UserBlock({ username, email }: UserBlockProps) {
  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/images/profile.png')} />
      <View style={styles.wrapper}>
        <Text style={styles.text}>{username}</Text>
        <Text style={styles.text}>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Gaps.gap10,
    marginTop: 30,
    marginBottom: 40,
  },

  wrapper: {
    alignItems: 'center',
    gap: 0,
  },

  text: {
    fontSize: FontSize.size18,
    fontFamily: Fonts.regular,
    color: Colors.white,
  },
});
