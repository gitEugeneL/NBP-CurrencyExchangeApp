import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, FontSize, Gaps, Radius } from '../../UI/styles';
import Button from '../../UI/Button/Button';
import { WalletCardProps } from './WalletCard.props';
import { PLN } from '../../assets/countries/PLN';
import { EUR } from '../../assets/countries/EUR';
import { CHF } from '../../assets/countries/CHF';
import { USD } from '../../assets/countries/USD';
import { CAD } from '../../assets/countries/CAD';
import { GBR } from '../../assets/countries/GBR';
import ConfirmModal from './UI/ConfirmModal/ConfirmModal';
import { useState } from 'react';
import { CreateWalletRequest } from '../../store/wallet/wallet.models';
import { useSetAtom } from 'jotai';
import { createUserWalletAtom } from '../../store/wallet/wallet.state';

export default function WalletCard({
  isCreated,
  name,
  shortName,
  country,
  value,
  symbol,
  currencyId,
}: WalletCardProps) {
  const createUserWallet = useSetAtom(createUserWalletAtom);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const handleCreateButton = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirmModal = () => {
    const request: CreateWalletRequest = {
      currencyId: currencyId,
    };
    createUserWallet(request);
    setModalVisible(false);
  };

  return (
    <View style={[styles.card, isCreated ? styles.withWallet : styles.withoutWallet]}>
      <View style={styles.container}>
        {shortName === 'PLN' && <PLN />}
        {shortName === 'EUR' && <EUR />}
        {shortName === 'CHF' && <CHF />}
        {shortName === 'USD' && <USD />}
        {shortName === 'CAD' && <CAD />}
        {shortName === 'GBR' && <GBR />}

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
            <Button style={styles.btn} name="Put money" size="small" />
            <Button style={styles.btn} name="Withdraw" size="small" />
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

            <ConfirmModal
              name={shortName}
              isVisible={isModalVisible}
              onClose={handleCloseModal}
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
    marginHorizontal: 25,
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
