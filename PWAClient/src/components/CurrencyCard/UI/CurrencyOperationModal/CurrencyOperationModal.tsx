import { CurrencyOperationModalProps } from './CurrencyOperationModal.props.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  CurrencyOperationSchema,
  CurrencyOperationValidationSchema
} from './CurrencyOperationModal.schemes.ts';
import cn from 'classnames';
import styles from './CurrencyOperationModal.module.pcss';
import MoneyInput from '../../../MoneyInput/MoneyInput.tsx';
import { roundMoney } from '../../../../helpers/moneyHelpers.ts';
import Button from '../../../../UI/Button/Button.tsx';

export default function CurrencyOperationModal({
  ...props
}: CurrencyOperationModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CurrencyOperationSchema>({
    resolver: yupResolver(CurrencyOperationValidationSchema(props.maxValue)),
    defaultValues: {
      amount: roundMoney(props.maxValue, 3)
    }
  });

  const formSubmit = (data: CurrencyOperationSchema) => {
    props.operation(data.amount);
  };

  return (
    <div
      className={cn(styles.backdrop, {
        [styles.modalBackdropActive]: props.isVisible
      })}
    >
      <div className={styles.modal}>
        <h3 className={styles.title}>
          {props.operationType === 'buy' ? 'Buy ' : 'Sell '}
          {props.name}
        </h3>

        <MoneyInput
          label={`1${props.symbol} = ${props.rate}zł 
          (Max: ${roundMoney(props.maxValue, 3)}${props.symbol})`}
          name='amount'
          shortName={props.shortName}
          control={control}
          placeholder={roundMoney(props.maxValue, 3).toString()}
          errors={errors}
        />

        <div className={styles.buttonContainer}>
          <Button
            name='Close'
            size='small'
            appearance='secondary'
            onClick={props.onClose}
          />
          <Button
            name={
              props.operationType === 'buy'
                ? `Buy ${props.shortName}`
                : `Sell ${props.shortName}`
            }
            size='small'
            onClick={handleSubmit(formSubmit)}
          />
        </div>
      </div>
    </div>
  );
}
