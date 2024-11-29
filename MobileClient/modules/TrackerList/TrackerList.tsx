import TrackerCard from './components/TrackerCard/TrackerCard';
import DatePicker from './components/DatePicker/DatePicker';
import { ScrollView } from 'react-native-gesture-handler';

export default function TrackerList() {
  return (
    <ScrollView>
      <DatePicker />
      <TrackerCard />
      <TrackerCard />
      <TrackerCard />
      <TrackerCard />
      <TrackerCard />
      <TrackerCard />
    </ScrollView>
  );
}
