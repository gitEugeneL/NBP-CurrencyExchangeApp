import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { ReactNode } from 'react';
import { PressableProps } from 'react-native';

export interface MenuItemProps extends PressableProps {
  drawer: DrawerContentComponentProps;
  icon: ReactNode;
  text: string;
  path: string;
}
