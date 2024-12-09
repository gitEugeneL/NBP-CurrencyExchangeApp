import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TransactionCard from './components/TransactionCard/TransactionCard';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  getAllTransactionsAtom,
  transactionState,
} from '../../store/transactions/transaction.state';
import { useEffect } from 'react';
import Loading from '../../UI/Loading/Loading';
import WarningCard from '../../components/WarningCard/WarningCard';

export default function TransactionList() {
  const { isLoading, transactions } = useAtomValue(transactionState);
  const loadTransactions = useSetAtom(getAllTransactionsAtom);

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <>
      {isLoading && <Loading />}

      {!isLoading && transactions.length === 0 && (
        <WarningCard
          title="There are no transactions yet!"
          appearance="money"
          buttonName="Show tracker"
          redirectRoute="tracker"
        />
      )}

      {!isLoading && (
        <ScrollView style={styles.container}>
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
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
});
