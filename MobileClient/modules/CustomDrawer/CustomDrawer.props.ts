import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { ReactNode } from 'react';

export interface CustomDrawerProps extends DrawerContentComponentProps {
  routes: { name: string; path: string; icon: ReactNode }[];
}
