import { CurrencyCardProps } from './CurrencyCard.props.ts';
import { buyMoneyAtom } from '../../store/wallet/wallet.state.ts';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { MoveMoneyRequest } from '../../store/wallet/wallet.models.ts';
import { getAllTransactionsAtom } from '../../store/transactions/transaction.state.ts';
import styles from './CurrencyCard.module.pcss';
import { isToday } from '../../helpers/dateHelpers.ts';
import cn from 'classnames';
import { roundMoney } from '../../helpers/moneyHelpers.ts';
import MoneyLogo from '../../UI/MoneyLogo/MoneyLogo.tsx';

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
  appearance = 'default'
}: CurrencyCardProps) {
  const buyMoney = useSetAtom(buyMoneyAtom);
  const loadTransactions = useSetAtom(getAllTransactionsAtom);

  const [isOperationModalVisible, setOperationModalVisible] =
    useState<boolean>(false);

  const handleCardClick = () => setOperationModalVisible(true);
  const handleCloseBtnOperationModal = () => setOperationModalVisible(false);

  const handleOperation = (amount: number) => {
    const request: MoveMoneyRequest = {
      walletId: walletId!,
      amount: amount,
      operation: appearance === 'buy' ? 'buy' : 'sell'
    };
    buyMoney(request).then(() => loadTransactions());
    setOperationModalVisible(false);
  };

  return (
    <>
      <div
        className={cn(styles.card, {
          [styles.activeCard]: appearance !== 'default'
        })}
        onClick={handleCardClick}
      >
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <p
              className={cn(styles.valueBlock, {
                [styles.disables]: appearance === 'buy'
              })}
            >
              sell: {!isToday(date) ? '(old) ' : null}
              <span className={styles.price}>{buyRate}</span>
            </p>

            <div>
              {appearance !== 'default' && (
                <p>
                  {symbol} {roundMoney(walletValue!)}
                </p>
              )}
              <p className={styles.shortName}>{shortName}</p>
            </div>
          </div>

          <div className={styles.wrapper}>
            <p
              className={cn(styles.valueBlock, {
                [styles.disables]: appearance === 'sell'
              })}
            >
              buy: {!isToday(date) ? '(old) ' : null}
              <span className={styles.price}>{sellRate}</span>
            </p>

            <div>
              <p
                className={cn(styles.valueBlock, {
                  [styles.disables]: appearance !== 'default'
                })}
              >
                NBP: {!isToday(date) ? ' (old) ' : null}
                <span className={styles.price}>{nbpRate}</span>
              </p>
            </div>
          </div>
        </div>

        <div>
          <MoneyLogo shortName={shortName} />
        </div>
      </div>
    </>
  );
}
