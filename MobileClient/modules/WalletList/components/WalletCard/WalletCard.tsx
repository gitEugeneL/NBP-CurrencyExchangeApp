import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, FontSize, Gaps, Radius } from '../../../../UI/styles';
import Button from '../../../../UI/Button/Button';
import { WalletCardProps } from './WalletCard.props';
import ConfirmCreate from './UI/ConfirmModal/ConfirmCreate';
import { useState } from 'react';
import {
  CreateWalletRequest,
  WalletOperationsRequest,
} from '../../../../store/wallet/wallet.models';
import { useSetAtom } from 'jotai';
import { createUserWalletAtom, walletOperationAtom } from '../../../../store/wallet/wallet.state';
import MoneyLogo from '../../../../UI/MoneyLogo/MoneyLogo';
import MoneyOperationModal from './UI/MoneyOperationModal/MoneyOperationModal';

export default function WalletCard({
  isCreated,
  name,
  shortName,
  country,
  value,
  symbol,
  currencyId,
  walletId,
}: WalletCardProps) {
  const createUserWallet = useSetAtom(createUserWalletAtom);
  const walletOperation = useSetAtom(walletOperationAtom);

  const [isConfirmModalVisible, setConfirmModalVisible] = useState<boolean>(false);
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
      currencyId: currencyId,
    };
    createUserWallet(request);
    setConfirmModalVisible(false);
  };

  const handleMoneyOperation = (amount: number, isWithdraw: boolean) => {
    const request: WalletOperationsRequest = {
      walletId: walletId,
      amount: amount,
      isWithdraw: isWithdraw,
    };
    walletOperation(request);
    setMoneyModalVisible(false);
  };

  return (
    <View style={[styles.card, isCreated ? styles.withWallet : styles.withoutWallet]}>
      <View style={styles.container}>
        <MoneyLogo shortName={shortName} />

        <View style={styles.wrapper}>
          <View style={styles.fistBlock}>
            <Text style={styles.shortName}>{shortName}</Text>
            <Text style={styles.country}>{country}</Text>
          </View>
          <View style={styles.secondBlock}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>
              {symbol}&nbsp;
              {isCreated ? value : '-'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonBlock}>
        {isCreated && (
          <>
            <Button
              style={styles.btn}
              onPressOut={handleAddMoneyButton}
              name="Add money"
              size="small"
            />

            <Button
              style={styles.btn}
              onPressOut={handleWithdrawButton}
              name="Withdraw"
              size="small"
            />

            <MoneyOperationModal
              isWithdraw={isWithdraw}
              value={value}
              symbol={symbol}
              shortName={shortName}
              isVisible={isMoneyModalVisible}
              onClose={handleCloseBtnMoneyModal}
              operation={handleMoneyOperation}
            />
          </>
        )}
        {!isCreated && (
          <>
            <Button
              style={styles.btn}
              onPressOut={handleCreateButton}
              name="Create wallet"
              appearance="secondary"
              size="small"
            />

            <ConfirmCreate
              name={shortName}
              isVisible={isConfirmModalVisible}
              onClose={handleCloseBtnConfirmModal}
              onConfirm={handleConfirmModal}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 15,
    borderRadius: Radius.radius20,
    backgroundColor: Colors.violetDark,
    gap: Gaps.gap16,
  },

  withWallet: {
    backgroundColor: Colors.violetDark,
  },

  withoutWallet: {
    backgroundColor: Colors.blackBlue,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  buttonBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Gaps.gap16,
  },

  btn: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },

  fistBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
  },

  secondBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
  },

  shortName: {
    fontFamily: Fonts.regular,
    color: Colors.white,
    fontSize: FontSize.size18,
  },

  country: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: FontSize.size14,
  },

  name: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: FontSize.size14,
  },

  price: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: FontSize.size18,
  },
});
