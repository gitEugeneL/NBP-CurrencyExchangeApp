import { WalletCardProps } from './WalletCard.props.ts';
import { useState } from 'react';
import {
  CreateWalletRequest,
  WalletOperationsRequest
} from '../../../../store/wallet/wallet.models.ts';
import styles from './WalletCard.module.pcss';
import { useSetAtom } from 'jotai';
import cn from 'classnames';
import MoneyLogo from '../../../../UI/MoneyLogo/MoneyLogo.tsx';
import {
  createUserWalletAtom,
  walletOperationAtom
} from '../../../../store/wallet/wallet.state.ts';
import { roundMoney } from '../../../../helpers/moneyHelpers.ts';
import Button from '../../../../UI/Button/Button.tsx';
import ConfirmModal from './ConfirmModal/ConfirmModal.tsx';
import OperationModal from './OperationModal/OperationModal.tsx';
import useNetworkStatus from '../../../../hoc/useNetworkSatus.ts';

export default function WalletCard({ ...props }: WalletCardProps) {
  const createUserWallet = useSetAtom(createUserWalletAtom);
  const walletOperation = useSetAtom(walletOperationAtom);

  const isOnline = useNetworkStatus();

  const [isConfirmModalVisible, setConfirmModalVisible] =
    useState<boolean>(false);
  const [isMoneyModalVisible, setMoneyModalVisible] = useState<boolean>(false);
  const [isWithdraw, setWithdraw] = useState<boolean>(false);

  const handleCreateButton = () => setConfirmModalVisible(true);
  const handleCloseBtnConfirmModal = () => setConfirmModalVisible(false);
  const handleCloseBtnMoneyModal = () => setMoneyModalVisible(false);

  const handleAddMoneyButton = () => {
    setWithdraw(false);
    setMoneyModalVisible(true);
  };

  const handleWithdrawButton = () => {
    setWithdraw(true);
    setMoneyModalVisible(true);
  };

  const handleConfirmModal = () => {
    const request: CreateWalletRequest = {
      currencyId: props.currencyId
    };
    createUserWallet(request);
    setConfirmModalVisible(false);
  };

  const handleMoneyOperation = (amount: number, isWithdraw: boolean) => {
    const request: WalletOperationsRequest = {
      walletId: props.walletId,
      amount: amount,
      isWithdraw: isWithdraw
    };
    walletOperation(request);
    setMoneyModalVisible(false);
  };

  return (
    <div
      className={cn(styles.card, {
        [styles.withWallet]: props.isCreated,
        [styles.withoutWallet]: !props.isCreated
      })}
    >
      <div className={styles.container}>
        <MoneyLogo shortName={props.shortName} />

        <div className={styles.wrapper}>
          <div className={styles.firstBlock}>
            <p className={styles.shortName}>{props.shortName}</p>
            <p className={styles.country}>{props.country}</p>
          </div>

          <div className={styles.secondBlock}>
            <p className={styles.name}>{props.name}</p>
            <p className={styles.price}>
              {props.symbol}&nbsp;
              {props.isCreated ? roundMoney(props.value) : '-'}
            </p>
          </div>
        </div>
      </div>

      {props.isCreated && (
        <div className={styles.btnBlock}>
          <Button
            disabled={!isOnline}
            name='Add money'
            size='small'
            onClick={handleAddMoneyButton}
          />
          <Button
            disabled={!isOnline}
            name='Withdraw'
            size='small'
            onClick={handleWithdrawButton}
          />

          <OperationModal
            isWithdraw={isWithdraw}
            value={props.value}
            symbol={props.symbol}
            shortName={props.shortName}
            isVisible={isMoneyModalVisible}
            onClose={handleCloseBtnMoneyModal}
            operation={handleMoneyOperation}
          />
        </div>
      )}

      {!props.isCreated && (
        <>
          <Button
            name='Create wallet'
            appearance='secondary'
            size='small'
            onClick={handleCreateButton}
          />

          <ConfirmModal
            name={props.shortName}
            isVisible={isConfirmModalVisible}
            onClose={handleCloseBtnConfirmModal}
            onConfirm={handleConfirmModal}
          />
        </>
      )}
    </div>
  );
}
