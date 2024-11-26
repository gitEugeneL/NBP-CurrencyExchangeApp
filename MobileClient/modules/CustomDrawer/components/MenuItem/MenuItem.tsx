import { MenuItemProps } from './MenuItem.props';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Colors, Fonts, FontSize, Gaps } from '../../../../UI/styles';

export default function MenuItem({ drawer, text, path, icon, ...props }: MenuItemProps) {
  const [clicked, setClicked] = useState<boolean>(false);
  const isActive = drawer.state.routes[drawer.state.index].name === path;

  return (
    <Pressable
      style={styles.container}
      {...props}
      onPress={() => drawer.navigation.navigate(path)}
      onPressIn={() => setClicked(true)}
      onPressOut={() => setClicked(false)}
    >
      <View
        style={{
          ...styles.menu,
          borderColor: isActive ? Colors.primary : Colors.black,
          backgroundColor: clicked || isActive ? Colors.violetDark : Colors.black,
        }}
      >
        <View style={styles.icon}>{icon}</View>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: -12,
  },

  menu: {
    flexDirection: 'row',
    gap: Gaps.gap20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRightWidth: 5,
  },

  icon: {
    position: 'absolute',
    top: 21,
    left: 60,
  },

  text: {
    marginLeft: 90,
    color: Colors.white,
    fontSize: FontSize.size18,
    fontFamily: Fonts.regular,
  },
});
