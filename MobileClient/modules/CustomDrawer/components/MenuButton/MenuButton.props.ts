import { PressableProps } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export interface MenuButtonProps extends PressableProps {
  navigation: DrawerNavigationProp<any>;
}
