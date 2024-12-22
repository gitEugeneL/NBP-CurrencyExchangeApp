import { ReactNode } from 'react';
import { StateScheme } from '../../store/user/user.state.ts';

export interface CustomDrawerProps {
  routes: { name: string; path: string; icon: ReactNode }[];
  toggleDrawer: () => void;
  isDrawerOpened: boolean;
  logout: () => void;
  user: StateScheme;
}
