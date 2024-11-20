import { View } from 'react-native';
import Button from '../../UI/Button/Button';
import { LogoutAtom } from '../../store/auth.state';
import { useSetAtom } from 'jotai';

export default function IndexPage() {
  const logout = useSetAtom(LogoutAtom);

  const testLogout = () => {
    console.log('test logout');
    logout();
  };

  return (
    <View>
      <Button name={'test logout'} onPress={testLogout} />
    </View>
  );
}
