import * as yup from 'yup';

export interface WalletOperationSchema {
  amount: number;
}

export const WalletOperationValidationSchema = (value: string | null) => {
  const max = !value ? 10000 : Number(value);

  return yup.object({
    amount: yup
      .number()
      .typeError('Amount must be a number')
      .required('Amount is required')
      .min(1, 'Minimum amount is 1')
      .max(max, `Maximum amount is ${max}`),
  });
};
