import { TextInputProps } from 'react-native';
import { Control, FieldErrors, FieldValues } from 'react-hook-form';

export interface PasswordInputProps extends TextInputProps {
  label: string;
  name: string;
  control: Control<any>;
  errors: FieldErrors<FieldValues>;
}
