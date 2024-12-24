import { OperationModalProps } from './OperationModal.props.ts';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  OperationSchema,
  OperationValidationSchema
} from './OperationModal.schemes.ts';
import styles from './OperationModal.module.pcss';
import cn from 'classnames';
import MoneyInput from '../../../../../components/MoneyInput/MoneyInput.tsx';
import Button from '../../../../../UI/Button/Button.tsx';

export default function OperationModal({ ...props }: OperationModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<OperationSchema>({
    resolver: yupResolver(
      OperationValidationSchema(props.isWithdraw ? props.value : null)
    ),
    defaultValues: {
      amount: 0
    }
  });

  const formSubmit = (data: OperationSchema) => {
    props.operation(data.amount, props.isWithdraw);
  };

  return (
    <div
      className={cn(styles.backdrop, {
        [styles.modalBackdropActive]: props.isVisible
      })}
    >
      <div className={styles.modal}>
        <h3 className={styles.title}>
          {props.isWithdraw ? 'Withdraw' : 'Add money'}
        </h3>

        <MoneyInput
          label={`Personal: ${props.symbol} ${props.value}`}
          name='amount'
          shortName={props.shortName}
          control={control}
          errors={errors}
          placeholder={props.isWithdraw ? props.value.toString() : '0.00'}
        />

        <div className={styles.buttonContainer}>
          <Button
            name='Close'
            size='small'
            appearance='secondary'
            onClick={props.onClose}
          />
          <Button
            name={props.isWithdraw ? 'Withdraw' : 'Add money'}
            size='small'
            onClick={handleSubmit(formSubmit)}
          />
        </div>
      </div>
    </div>
  );
}
