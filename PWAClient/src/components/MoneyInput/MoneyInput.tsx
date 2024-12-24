import { MoneyInputProps } from './MoneyInput.props.ts';
import styles from './MoneyInput.module.pcss';
import CustomInput from '../../UI/CustomInput/CustomInput.tsx';
import MoneyLogo from '../../UI/MoneyLogo/MoneyLogo.tsx';

export default function MoneyInput({
  label,
  name,
  shortName,
  control,
  errors,
  ...props
}: MoneyInputProps) {
  return (
    <div className={styles.input}>
      <CustomInput
        label={label}
        name={name}
        control={control}
        errors={errors}
        {...props}
        type='number'
      />
      <div className={styles.logo}>
        <MoneyLogo shortName={shortName} width={30} height={30} />
      </div>
      <span className={styles.shortName}>{shortName}</span>
    </div>
  );
}
