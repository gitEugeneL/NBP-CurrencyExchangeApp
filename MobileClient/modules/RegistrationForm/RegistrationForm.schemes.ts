import * as yup from 'yup';

export interface RegistrationFormSchema {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export const RegistrationFormValidationSchema = yup.object({
  email: yup.string().required('Email is required').email('Enter valid email'),

  name: yup.string().required('Field is required').max(150, 'Over 150 characters'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Less than 8 characters')
    .max(20, 'Over 20 characters')
    .matches(
      /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must be strong',
    ),

  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Password must match'),
});
