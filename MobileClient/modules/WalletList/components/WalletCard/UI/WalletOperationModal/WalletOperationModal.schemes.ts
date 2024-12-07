import * as yup from 'yup';
import { roundMoney } from '../../../../../../helpers/moneyHelpers';

export interface WalletOperationSchema {
  amount: number;
}

export const WalletOperationValidationSchema = (value: number | null) => {
  const maxValue = !value ? 100000 : roundMoney(value, 4);

  return yup.object({
    amount: yup
      .number()
      .typeError('Amount must be a number')
      .required('Amount is required')
      .min(1, 'Minimum amount is 1')
      .max(maxValue, `Maximum amount is ${maxValue}`),
  });
};
