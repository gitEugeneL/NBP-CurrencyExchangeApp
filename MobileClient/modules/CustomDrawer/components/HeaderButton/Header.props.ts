import { PressableProps } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export interface HeaderProps extends PressableProps {
  navigation: DrawerNavigationProp<any>;
}
