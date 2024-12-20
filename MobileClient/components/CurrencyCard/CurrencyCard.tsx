import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, FontSize, Gaps, Radius } from '../../UI/styles';
import React, { useState } from 'react';
import MoneyLogo from '../../UI/MoneyLogo/MoneyLogo';
import { CurrencyCardProps } from './CurrencyCard.props';
import { isToday } from '../../helpers/dateHelpers';
import CurrencyOperationModal from './UI/CurrencyOperationModal/CurrencyOperationModal';
import { MoveMoneyRequest } from '../../store/wallet/wallet.models';
import { useSetAtom } from 'jotai';
import { buyMoneyAtom } from '../../store/wallet/wallet.state';
import { roundMoney } from '../../helpers/moneyHelpers';
import { getAllTransactionsAtom } from '../../store/transactions/transaction.state';

export default function CurrencyCard({
  date,
  name,
  shortName,
  buyRate,
  sellRate,
  nbpRate,
  symbol,
  walletId,
  walletValue = null,
  baseValue = null,
  appearance = 'default',
}: CurrencyCardProps) {
  const buyMoney = useSetAtom(buyMoneyAtom);
  const loadTransactions = useSetAtom(getAllTransactionsAtom);

  const [isOperationModalVisible, setOperationModalVisible] = useState<boolean>(false);

  const handleCardClick = () => setOperationModalVisible(true);
  const handleCloseBtnOperationModal = () => setOperationModalVisible(false);

  const handleOperation = (amount: number) => {
    const request: MoveMoneyRequest = {
      walletId: walletId!,
      amount: amount,
      operation: appearance === 'buy' ? 'buy' : 'sell',
    };
    buyMoney(request).then(() => loadTransactions());
    setOperationModalVisible(false);
  };

  return (
    <>
      <Pressable style={styles.card} onPressOut={handleCardClick}>
        <View style={styles.textWrapper}>
          <View style={styles.firstBlock}>
            <Text style={[styles.valueBlock, appearance === 'buy' ? styles.disabled : null]}>
              sell: {!isToday(date) ? '(old) ' : null}
              <Text style={styles.price}>{buyRate}</Text>
            </Text>
            <View style={styles.namesBlock}>
              {appearance !== 'default' && (
                <Text style={styles.valueBlock}>
                  {symbol} {roundMoney(walletValue!)}
                </Text>
              )}
              <Text style={styles.shortName}>{shortName}</Text>
            </View>
          </View>

          <View style={styles.secondBlock}>
            <Text style={[styles.valueBlock, appearance === 'sell' ? styles.disabled : null]}>
              buy: {!isToday(date) ? '(old) ' : null}
              <Text style={styles.price}>{sellRate}</Text>
            </Text>
            <Text style={[styles.valueBlock, appearance !== 'default' ? styles.disabled : null]}>
              NBP: {!isToday(date) ? ' (old) ' : null}
              <Text style={styles.price}>{nbpRate}</Text>
            </Text>
          </View>
        </View>
        <View>
          <MoneyLogo shortName={shortName} />
        </View>
      </Pressable>

      {appearance !== 'default' && (
        <CurrencyOperationModal
          isVisible={isOperationModalVisible}
          onClose={handleCloseBtnOperationModal}
          operationType={appearance}
          operation={handleOperation}
          name={name}
          shortName={shortName}
          symbol={symbol}
          maxValue={appearance === 'buy' ? baseValue! / sellRate! : walletValue!}
          rate={appearance === 'buy' ? sellRate! : buyRate!}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 25,
    flexDirection: 'row',
    marginVertical: 15,
    padding: 15,
    borderRadius: Radius.radius20,
    backgroundColor: Colors.blackBlue,
    gap: Gaps.gap16,
  },

  disabled: {
    color: Colors.blackGray,
  },

  price: {
    fontFamily: Fonts.semiBold,
  },

  textWrapper: {
    flex: 1,
    justifyContent: 'center',
  },

  namesBlock: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Gaps.gap10,
  },

  valueBlock: {
    fontFamily: Fonts.regular,
    color: Colors.white,
    fontSize: FontSize.size14,
  },

  shortName: {
    fontFamily: Fonts.semiBold,
    color: Colors.white,
    fontSize: FontSize.size18,
  },

  firstBlock: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  secondBlock: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
