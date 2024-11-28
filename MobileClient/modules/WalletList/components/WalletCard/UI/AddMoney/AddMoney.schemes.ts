import * as yup from 'yup';

export interface AddMoneySchema {
  amount: number;
}

export const AddMoneyValidationSchema = yup.object({
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .required('Amount is required')
    .min(1, 'Minimum amount is 1')
    .max(10000, 'Maximum amount is 10000'),
});
