import { InputHTMLAttributes } from 'react';
import { Control, FieldErrors, FieldValues } from 'react-hook-form';

export interface PasswordInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  control: Control<any>;
  errors: FieldErrors<FieldValues>;
}