import { StyleSheet, View } from 'react-native';
import { Colors } from '../../UI/styles';
import BuyCurrency from '../../modules/BuyCurrency/BuyCurrency';

export default function BuyPage() {
  return (
    <View style={styles.container}>
      <BuyCurrency />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});
