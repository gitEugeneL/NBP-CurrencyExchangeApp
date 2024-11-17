import { PressableProps } from 'react-native';

export interface ButtonProps extends PressableProps {
  name: string;
  appearance?: 'primary' | 'secondary';
  isLoading?: boolean;
}
