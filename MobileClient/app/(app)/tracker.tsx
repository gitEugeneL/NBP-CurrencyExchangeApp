import { StyleSheet, View } from 'react-native';
import { Colors } from '../../UI/styles';
import TrackerList from '../../modules/TrackerList/TrackerList';

export default function Tracker() {
  return (
    <View style={styles.container}>
      <TrackerList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});
