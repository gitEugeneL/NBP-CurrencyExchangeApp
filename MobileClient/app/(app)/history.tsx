import { StyleSheet, View } from 'react-native';
import { Colors } from '../../UI/styles';
import HistoryList from '../../modules/HistoryList/HistoryList';

export default function HistoryPage() {
  return (
    <View style={styles.container}>
      <HistoryList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});
