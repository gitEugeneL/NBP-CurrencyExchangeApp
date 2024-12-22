import { UserBlockProps } from './UserBlock.props';
import styles from './UserBlock.module.pcss';
import profileImage from '../../../assets/images/profile.png';
import Button from '../../../UI/Button/Button.tsx';
import { useState } from 'react';
import cn from 'classnames';

export default function UserBlock({ username, email, logout }: UserBlockProps) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={profileImage}
        alt='user image'
        onClick={toggleModal}
      />
      <div className={styles.wrapper}>
        <p className={styles.name}>{username}</p>
        <p className={styles.email}>{email}</p>
      </div>

      <div
        className={cn(styles.modal, {
          [styles.active]: modalIsOpen
        })}
      >
        <div className={styles.modalWrapper}>
          <p className={styles.name}>{username}</p>
          <p className={styles.email}>{email}</p>
        </div>
        <div className={styles.button}>
          <Button
            name='Logout'
            appearance='secondary'
            size='small'
            onClick={logout}
          />
        </div>
      </div>
    </div>
  );
}
