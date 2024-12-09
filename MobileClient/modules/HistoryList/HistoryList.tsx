import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HistoryCard from './components/HistoryCard/HistoryCard';

export default function HistoryList() {
  return (
    <ScrollView style={styles.container}>
      <HistoryCard />
      <HistoryCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
});
