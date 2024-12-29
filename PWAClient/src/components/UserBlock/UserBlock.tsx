import { UserBlockProps } from './UserBlock.props.ts';
import styles from './UserBlock.module.pcss';
import profileImage from '../../assets/images/profile.png';
import Button from '../../UI/Button/Button.tsx';
import { useState } from 'react';
import cn from 'classnames';

export default function UserBlock({ ...props }: UserBlockProps) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <div
      className={cn(styles.container, {
        [styles.activeContainer]: modalIsOpen
      })}
      onClick={toggleModal}
    >
      <img className={styles.image} src={profileImage} alt='user image' />
      <div className={styles.wrapper}>
        <p className={styles.name}>{props.username}</p>
        <p className={styles.email}>{props.email}</p>
        <p className={styles.geoData}>{props.geoData}</p>
      </div>

      <div
        className={cn(styles.modalBackdrop, {
          [styles.modalBackdropActive]: modalIsOpen
        })}
      >
        <div className={styles.modal}>
          <div className={styles.modalWrapper}>
            <p className={styles.name}>{props.username}</p>
            <p className={styles.email}>{props.email}</p>
            <p className={styles.geoData}>{props.geoData}</p>
          </div>
          <div className={styles.button}>
            <Button
              name='Logout'
              appearance='secondary'
              size='small'
              onClick={props.logout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
