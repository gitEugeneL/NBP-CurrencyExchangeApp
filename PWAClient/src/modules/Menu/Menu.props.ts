import { ReactNode } from 'react';
import { StateScheme } from '../../store/user/user.state.ts';

export interface MenuProps {
  routeName: string;
  toggleDrawer: () => void;
  routes: { name: string; path: string; icon: ReactNode }[];
  logout: () => void;
  user: StateScheme;
}
