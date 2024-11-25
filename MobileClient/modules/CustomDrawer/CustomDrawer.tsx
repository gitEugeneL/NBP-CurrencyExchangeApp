import { DrawerContentScrollView } from '@react-navigation/drawer';
import { StyleSheet, View } from 'react-native';
import CustomLink from '../../UI/CustomLink/CustomLink';
import { useAtom, useSetAtom } from 'jotai';
import { logoutAtom } from '../../store/auth/auth.state';
import { CustomDrawerProps } from './CustomDrawer.props';
import { Colors, Gaps } from '../../UI/styles';
import CloseButton from './components/CloseButton/CloseButton';
import { CompactLogo } from '../../assets/elements/CompactLogo';
import { getUserInfoAtom } from '../../store/user/user.state';
import { useEffect } from 'react';
import UserBlock from './components/UserBlock/UserBlock';

export default function CustomDrawer({ ...props }: CustomDrawerProps) {
  const logout = useSetAtom(logoutAtom);
  const [user, getUserInfo] = useAtom(getUserInfoAtom);

  const handleLogout = () => logout();

  useEffect(() => {
    if (!user.userId) {
      getUserInfo();
    }
  }, []);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        <CloseButton navigation={props.navigation} />
        {user.username && user.email && <UserBlock username={user.username} email={user.email} />}
      </View>
      <View style={styles.footer}>
        <CustomLink name="Logout" href={'/auth/login'} onPress={handleLogout} />
        <CompactLogo />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },

  wrapper: {
    flex: 1,
  },

  footer: {
    gap: Gaps.gap20,
    alignItems: 'center',
    marginBottom: 10,
  },
});
