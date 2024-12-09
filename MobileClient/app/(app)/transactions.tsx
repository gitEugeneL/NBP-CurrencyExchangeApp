import { StyleSheet, View } from 'react-native';
import { Colors } from '../../UI/styles';
import TransactionList from '../../modules/TransactionList/TransactionList';

export default function TransactionsPage() {
  return (
    <View style={styles.container}>
      <TransactionList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});
