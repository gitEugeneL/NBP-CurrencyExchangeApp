import { View } from 'react-native';
import Button from '../../UI/Button/Button';
import { useSetAtom } from 'jotai';
import { logoutAtom } from '../../store/auth/auth.state';

export default function IndexPage() {
  const logout = useSetAtom(logoutAtom);

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
