import { StyleSheet, View } from 'react-native';
import { Colors } from '../../UI/styles';
import MoveCurrency from '../../modules/MoveCurrency/MoveCurrency';

export default function SellPage() {
  return (
    <View style={styles.container}>
      <MoveCurrency appearance="sell" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});
