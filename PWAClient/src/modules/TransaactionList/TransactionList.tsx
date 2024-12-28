import { useAtomValue, useSetAtom } from 'jotai';
import {
  getAllTransactionsAtom,
  transactionState
} from '../../store/transactions/transaction.state.ts';
import { useEffect } from 'react';
import LoaderIndicator from '../../assets/elements/LoaderIndicator.tsx';
import WarningCard from '../../components/WarningCard/WarningCard.tsx';
import TransactionCard from './components/TransactionCard/TransactionCard.tsx';

export default function TransactionList() {
  const { isLoading, transactions } = useAtomValue(transactionState);
  const loadTransactions = useSetAtom(getAllTransactionsAtom);

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <>
      {isLoading && <LoaderIndicator />}

      {!isLoading && transactions.length > 0 && (
        <>
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.transactionId}
              transactionDate={transaction.transactionDate}
              inputAmount={transaction.inputAmount}
              outputAmount={transaction.outputAmount}
              inputCurrencyShortName={transaction.inputCurrencyShortName}
              inputCurrencySymbol={transaction.inputCurrencySymbol}
              outputCurrencyShortName={transaction.outputCurrencyShortName}
              outputCurrencySymbol={transaction.outputCurrencySymbol}
            />
          ))}
        </>
      )}

      {!isLoading && transactions.length === 0 && (
        <WarningCard
          title='There are no transactions yet!'
          appearance='money'
          buttonName='Show tracker'
          redirectRoute='tracker'
        />
      )}
    </>
  );
}
