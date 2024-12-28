import styles from './DatePicker.module.pcss';
import Button from '../../../../UI/Button/Button.tsx';
import 'react-day-picker/style.css';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { DatePickerProps } from './DatePicker.props.ts';
import cn from 'classnames';
import { dateToFormat } from '../../../../helpers/dateHelpers.ts';
import useNetworkStatus from '../../../../hoc/useNetworkSatus.ts';

export default function DatePicker({ ...props }: DatePickerProps) {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  const isOnline = useNetworkStatus();

  const toggleModal = () => setIsShowModal(!isShowModal);

  const handleSelectDate = () => {
    const currentDate = selectedDate || props.date;
    props.loadWithDate(currentDate);
    props.setDate(currentDate);
    setIsShowModal(false);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.date}>
          <span className={styles.dateText}>{dateToFormat(props.date)}</span>
        </div>
        <div className={styles.button}>
          <Button
            disabled={!isOnline}
            name='Change'
            size='small'
            onClick={toggleModal}
          />
        </div>
      </div>

      <div
        className={cn(styles.modalBackdrop, {
          [styles.modalBackdropActive]: isShowModal
        })}
      >
        <div className={styles.modal}>
          <DayPicker
            mode='single'
            selected={selectedDate}
            onSelect={setSelectedDate}
            className={styles.dayPicker}
            disabled={{ after: new Date() }}
          />

          <div className={styles.modalWrapper}>
            <Button
              name='Close'
              size='small'
              appearance='secondary'
              onClick={toggleModal}
            />
            <Button name='Select' size='small' onClick={handleSelectDate} />
          </div>
        </div>
      </div>
    </>
  );
}
