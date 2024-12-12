import * as yup from 'yup';
import { roundMoney } from '../../../../helpers/moneyHelpers';

export interface CurrencyOperationSchema {
  amount: number;
}

export const CurrencyOperationValidationSchema = (maxValue: number) => {
  const value = roundMoney(maxValue, 3);

  return yup.object({
    amount: yup
      .number()
      .typeError('Must be a number')
      .required('Amount is required')
      .positive()
      .max(value, `max value is ${value}`),
  });
};
