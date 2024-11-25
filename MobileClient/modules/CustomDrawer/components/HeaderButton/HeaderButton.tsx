import { HeaderProps } from './Header.props';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ItemIcon } from './icons/ItemIcon';
import { Colors } from '../../../../UI/styles';

export default function HeaderButton({ navigation, ...props }: HeaderProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <Pressable
      {...props}
      onPressIn={() => setClicked(true)}
      onPressOut={() => setClicked(false)}
      onPress={() => navigation.toggleDrawer()}
    >
      <View
        style={{
          ...styles.button,
          backgroundColor: clicked ? Colors.violetDark : Colors.blackBlue,
        }}
      >
        <ItemIcon />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
