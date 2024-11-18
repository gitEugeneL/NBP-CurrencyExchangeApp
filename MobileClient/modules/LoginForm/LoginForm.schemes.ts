import * as yup from 'yup';

export interface LoginFormSchema {
  email: string;
  password: string;
}

export const LoginFormValidationSchema = yup.object({
  email: yup.string().required('Email is required').email('Enter valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Less than 8 characters')
    .max(20, 'Over 20 characters')
    .matches(
      /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must be strong',
    ),
});
