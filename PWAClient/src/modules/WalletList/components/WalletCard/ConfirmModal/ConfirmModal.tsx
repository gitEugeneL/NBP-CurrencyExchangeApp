import { ConfirmModalProps } from './ConfirmModal.props.ts';
import cn from 'classnames';
import styles from './ConfirmModal.module.pcss';
import Button from '../../../../../UI/Button/Button.tsx';

export default function ConfirmModal({ ...props }: ConfirmModalProps) {
  return (
    <div
      className={cn(styles.backdrop, {
        [styles.modalBackdropActive]: props.isVisible
      })}
    >
      <div className={styles.modal}>
        <h3 className={styles.modalText}>Creating {props.name} wallet?</h3>

        <div className={styles.buttonContainer}>
          <Button
            name='Close'
            size='small'
            appearance='secondary'
            onClick={props.onClose}
          />
          <Button name='Create' size='small' onClick={props.onConfirm} />
        </div>
      </div>
    </div>
  );
}
