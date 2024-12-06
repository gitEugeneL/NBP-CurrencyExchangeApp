import * as yup from 'yup';

export interface CurrencyOperationSchema {
  amount: number;
}

export const CurrencyOperationValidationSchema = (maxValue: number) => {
  return yup.object({
    amount: yup
      .number()
      .typeError('Must be a number')
      .required('Amount is required')
      .min(0.1, 'Minimum is 0.1')
      .max(maxValue, `max value is ${maxValue}`),
  });
};
