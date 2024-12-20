import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  appearance?: 'primary' | 'secondary';
  size?: 'normal' | 'small';
  isLoading?: boolean;
}
