import { InputHTMLAttributes } from 'react';
import { Control, FieldErrors, FieldValues } from 'react-hook-form';

export interface MoneyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  shortName: string;
  control: Control<any>;
  errors: FieldErrors<FieldValues>;
}
