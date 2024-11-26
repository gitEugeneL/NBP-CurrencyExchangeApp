import { StyleSheet, View } from 'react-native';
import { Colors } from '../../UI/styles';
import WalletList from '../../modules/WalletList/WalletList';

export default function IndexPage() {
  return (
    <View style={styles.container}>
      <WalletList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});
