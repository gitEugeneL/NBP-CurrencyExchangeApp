import { ReactNode } from 'react';

export interface MenuItemProps {
  name: string;
  path: string;
  icon: ReactNode;
  toggleDrawer: () => void;
}
