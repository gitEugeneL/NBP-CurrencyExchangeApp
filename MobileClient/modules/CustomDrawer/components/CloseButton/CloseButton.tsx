import { Pressable, StyleSheet, View } from 'react-native';
import { CloseButtonProps } from './CloseButton.props';
import { CloseIcon } from './incons/CloseIcon';

export default function CloseButton({ navigation }: CloseButtonProps) {
  return (
    <Pressable onPress={() => navigation.closeDrawer()}>
      <View style={styles.button}>
        <CloseIcon />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 15,
    right: 15,
  },
});
