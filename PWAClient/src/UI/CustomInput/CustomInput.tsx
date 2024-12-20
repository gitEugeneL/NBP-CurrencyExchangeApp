import { CustomInputProps } from './CustomInput.props.ts';
import styles from './CustomInput.module.pcss';
import { Controller } from 'react-hook-form';
import cn from 'classnames';

export default function CustomInput({
  label,
  name,
  control,
  errors,
  ...props
}: CustomInputProps) {
  return (
    <div>
      <div className={styles.label}>{label}</div>

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <input
            className={cn(styles.input, {
              [styles.inputError]: errors[name]?.message
            })}
            {...props}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
      />

      <div className={styles.errorBlock}>
        {errors[name]?.message && (
          <span className={styles.errorText}>
            {(errors[name] as { message?: string }).message}
          </span>
        )}
      </div>
    </div>
  );
}
