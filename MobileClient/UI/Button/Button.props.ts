import { PressableProps } from 'react-native';

export interface ButtonProps extends PressableProps {
  name: string;
  appearance?: 'primary' | 'secondary';
  size?: 'normal' | 'small';
  isLoading?: boolean;
}
