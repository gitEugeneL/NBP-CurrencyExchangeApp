import { TextInputProps } from 'react-native';
import { Control, FieldErrors, FieldValues } from 'react-hook-form';

export interface MoneyInputProps extends TextInputProps {
  label: string;
  name: string;
  shortName: string;
  control: Control<any>;
  errors: FieldErrors<FieldValues>;
}
