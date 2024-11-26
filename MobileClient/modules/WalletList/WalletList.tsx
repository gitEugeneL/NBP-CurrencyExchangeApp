import WalletCard from '../../components/WalletCard/WalletCard';
import { ScrollView } from 'react-native-gesture-handler';

export default function WalletList() {
  return (
    <ScrollView>
      <WalletCard />
      <WalletCard />
      <WalletCard />
      <WalletCard />
      <WalletCard />
      <WalletCard />
    </ScrollView>
  );
}
